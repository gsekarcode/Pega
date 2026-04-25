import { useState, useEffect } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';

import type { PConnProps } from './PConnProps';
import './create-nonce';
import { DevDXExtensionsKPICard } from '../DevDX_Extensions_KPICard/index';
import {
  StyledWrapper,
  StyledHeading,
  StyledCardsRow,
  StyledError
} from './styles';

interface KPIStat {
  label: string;
  value: string;
  color: string;
}

interface ReportPanelProps extends PConnProps {
  heading?: string;
  dataPageName?: string;
  // Fallback static stats when no dataPageName is provided
  stat1Label?: string;
  stat1Value?: string;
  stat1Color?: string;
  stat2Label?: string;
  stat2Value?: string;
  stat2Color?: string;
  stat3Label?: string;
  stat3Value?: string;
  stat3Color?: string;
}

const DEFAULT_COLOR = '#2563eb';

function DevDXExtensionsReportPanel(props: ReportPanelProps) {
  const {
    getPConnect,
    heading = 'Reports',
    dataPageName = '',
    stat1Label = '',
    stat1Value = '',
    stat1Color = DEFAULT_COLOR,
    stat2Label = '',
    stat2Value = '',
    stat2Color = '#16a34a',
    stat3Label = '',
    stat3Value = '',
    stat3Color = '#9333ea'
  } = props;

  const [stats, setStats] = useState<KPIStat[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!dataPageName) {
      // Use static props as the data source
      const staticStats: KPIStat[] = [
        { label: stat1Label, value: stat1Value, color: stat1Color },
        { label: stat2Label, value: stat2Value, color: stat2Color },
        { label: stat3Label, value: stat3Value, color: stat3Color }
      ].filter(s => s.label || s.value);
      setStats(staticStats);
      return;
    }

    const PCore = (window as any).PCore;
    if (!PCore?.getDataPageUtils) {
      setError('PCore not available — cannot load data page.');
      return;
    }

    PCore.getDataPageUtils()
      .getPageDataAsync(dataPageName, getPConnect().getContextName())
      .then((page: any) => {
        const raw: KPIStat[] = [
          { label: page.Stat1Label ?? '', value: String(page.Stat1Value ?? ''), color: page.Stat1Color || DEFAULT_COLOR },
          { label: page.Stat2Label ?? '', value: String(page.Stat2Value ?? ''), color: page.Stat2Color || '#16a34a' },
          { label: page.Stat3Label ?? '', value: String(page.Stat3Value ?? ''), color: page.Stat3Color || '#9333ea' }
        ].filter(s => s.label || s.value);
        setStats(raw);
      })
      .catch(() => setError(`Failed to load data page: ${dataPageName}`));
  }, [dataPageName, getPConnect, stat1Label, stat1Value, stat1Color, stat2Label, stat2Value, stat2Color, stat3Label, stat3Value, stat3Color]);

  const makePConnect = () => () => ({ getInheritedProps: () => ({}) });

  return (
    <StyledWrapper data-testid='report-panel'>
      <StyledHeading>{heading}</StyledHeading>
      {error && <StyledError>{error}</StyledError>}
      <StyledCardsRow data-testid='kpi-cards-row'>
        {(stats ?? []).map(stat => (
          <DevDXExtensionsKPICard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            getPConnect={makePConnect()}
          />
        ))}
      </StyledCardsRow>
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsReportPanel);
export { DevDXExtensionsReportPanel };
