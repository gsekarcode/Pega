import { useState, useEffect, useMemo, ComponentType } from 'react';
import { withConfiguration, Table, Pagination } from '@pega/cosmos-react-core';
import type { ColumnProps } from '@pega/cosmos-react-core';
import type { PConnProps } from './PConnProps';
import {
  StyledContainer,
  StyledTableWrapper,
  StyledFooter,
  StyledPageSizeRow,
  StyledRowCount,
  StyledEmptyState,
  StyledError,
  StyledTitle
} from './styles';

interface ColumnDef {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

type RowData = { id: string | number; [key: string]: unknown };

interface PaginatedTableProps extends PConnProps {
  title?: string;
  /** Pega List Data Page name, e.g. D_MyList */
  dataPageName?: string;
  /** Fallback static data as a JSON string (array of objects) */
  dataJson?: string;
  /** Column definitions as a JSON string: [{"key":"name","label":"Name","align":"left"}] */
  columnsJson?: string;
  /** Rows per page */
  pageSize?: number | string;
  /** Allow user to change page size */
  showPageSizeSelector?: boolean | string;
  /** Zebra row striping */
  zebra?: boolean | string;
  hoverHighlight?: boolean | string;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

const coerceInt = (val: number | string | undefined, fallback: number): number => {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback;
};

const safeParseJson = <T,>(json: string | undefined, fallback: T): T => {
  if (!json) return fallback;
  try { return JSON.parse(json) as T; } catch { return fallback; }
};

// Creates a stable cell renderer component for a given row key
function makeCellRenderer(key: string): ComponentType<RowData> {
  const Renderer = (row: RowData) => <>{row[key] ?? ''}</>;
  Renderer.displayName = `Cell_${key}`;
  return Renderer;
}

function DevDXExtensionsPaginatedTable(props: PaginatedTableProps) {
  const {
    getPConnect,
    title = '',
    dataPageName = '',
    dataJson = '',
    columnsJson = '',
  } = props;

  const zebra           = coerceBool(props.zebra, true);
  const hoverHighlight  = coerceBool(props.hoverHighlight, true);
  const showPageSize    = coerceBool(props.showPageSizeSelector, true);
  const initialPageSize = coerceInt(props.pageSize, 10);

  const [allRows, setAllRows]   = useState<RowData[]>([]);
  const [pageNumber, setPage]   = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  // Parse column definitions once
  const columnDefs: ColumnDef[] = useMemo(
    () => safeParseJson<ColumnDef[]>(columnsJson, []),
    [columnsJson]
  );

  // Build Table column specs; renderers are stable per key
  const columns: ColumnProps<RowData>[] = useMemo(
    () =>
      columnDefs.map(col => ({
        label: col.label,
        align: col.align ?? 'left',
        renderer: makeCellRenderer(col.key) as ComponentType<RowData>
      })),
    [columnDefs]
  );

  // Load data — from Data Page or static JSON fallback
  useEffect(() => {
    if (dataPageName) {
      const PCore = (window as any).PCore;
      if (!PCore?.getDataPageUtils) {
        setError('PCore not available — cannot load data page.');
        return;
      }
      setLoading(true);
      setError('');
      PCore.getDataPageUtils()
        .getListDataAsync(dataPageName, getPConnect().getContextName())
        .then((result: any) => {
          const raw: RowData[] = (Array.isArray(result) ? result : result?.data ?? []) as RowData[];
          setAllRows(raw.map((r, i) => ({ ...r, id: r.id ?? (r as any).pyGUID ?? i })));
        })
        .catch(() => setError(`Failed to load data page: ${dataPageName}`))
        .finally(() => setLoading(false));
      return;
    }

    const parsed = safeParseJson<RowData[]>(dataJson, []);
    setAllRows(parsed.map((r, i) => ({ ...r, id: r.id ?? i })));
  }, [dataPageName, dataJson, getPConnect]);

  // Reset to page 1 when page size changes
  useEffect(() => { setPage(1); }, [pageSize]);

  const totalRows   = allRows.length;
  const startIndex  = (pageNumber - 1) * pageSize;
  const pageRows    = allRows.slice(startIndex, startIndex + pageSize);

  const startRow = totalRows === 0 ? 0 : startIndex + 1;
  const endRow   = Math.min(startIndex + pageSize, totalRows);

  return (
    <StyledContainer data-testid='paginated-table'>
      {title && <StyledTitle>{title}</StyledTitle>}

      {error && <StyledError>{error}</StyledError>}

      <StyledTableWrapper $zebra={zebra}>
        {columns.length === 0 || (totalRows === 0 && !loading) ? (
          <StyledEmptyState>
            {loading ? 'Loading…' : 'No data to display.'}
          </StyledEmptyState>
        ) : (
          <Table
            columns={columns}
            data={pageRows}
            hoverHighlight={hoverHighlight}
            loading={loading}
            loadingMessage='Loading data…'
          />
        )}
      </StyledTableWrapper>

      <StyledFooter>
        <StyledPageSizeRow>
          {showPageSize && (
            <>
              Rows per page:
              <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}
                aria-label='Rows per page'
              >
                {PAGE_SIZE_OPTIONS.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </>
          )}
        </StyledPageSizeRow>

        <Pagination
          total={totalRows}
          pageSize={pageSize}
          pageNumber={pageNumber}
          onPageChange={setPage}
        />

        <StyledRowCount>
          {totalRows > 0 ? `${startRow}–${endRow} of ${totalRows}` : '0 rows'}
        </StyledRowCount>
      </StyledFooter>
    </StyledContainer>
  );
}

export default withConfiguration(DevDXExtensionsPaginatedTable);
export { DevDXExtensionsPaginatedTable };
