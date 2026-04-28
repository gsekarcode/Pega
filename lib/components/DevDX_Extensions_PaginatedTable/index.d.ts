/// <reference types="react" />
import type { PConnProps } from './PConnProps';
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
declare function DevDXExtensionsPaginatedTable(props: PaginatedTableProps): import("react/jsx-runtime").JSX.Element;
declare const _default: (props: PaginatedTableProps) => JSX.Element;
export default _default;
export { DevDXExtensionsPaginatedTable };
//# sourceMappingURL=index.d.ts.map