import { render, screen } from '@testing-library/react';
import { DevDXExtensionsReportPanel } from './index';

const makePConnect = () => () => ({
  getInheritedProps: () => ({}),
  getContextName: () => 'app/primary'
});

describe('DevDXExtensionsReportPanel', () => {
  test('renders heading', () => {
    render(
      <DevDXExtensionsReportPanel
        heading='Reports'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('Reports')).toBeVisible();
  });

  test('renders static stat cards', () => {
    render(
      <DevDXExtensionsReportPanel
        heading='Reports'
        stat1Label='Open Cases'
        stat1Value='142'
        stat1Color='#2563eb'
        stat2Label='Resolved Today'
        stat2Value='38'
        stat2Color='#16a34a'
        stat3Label='Avg Resolution (hrs)'
        stat3Value='4.2'
        stat3Color='#9333ea'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('Open Cases')).toBeVisible();
    expect(screen.getByText('142')).toBeVisible();
    expect(screen.getByText('Resolved Today')).toBeVisible();
    expect(screen.getByText('38')).toBeVisible();
    expect(screen.getByText('Avg Resolution (hrs)')).toBeVisible();
    expect(screen.getByText('4.2')).toBeVisible();
  });

  test('renders panel container', () => {
    render(
      <DevDXExtensionsReportPanel
        heading='Test'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByTestId('report-panel')).toBeVisible();
  });

  test('renders cards row', () => {
    render(
      <DevDXExtensionsReportPanel
        heading='Test'
        stat1Label='Cases'
        stat1Value='10'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByTestId('kpi-cards-row')).toBeVisible();
  });
});
