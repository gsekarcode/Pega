import { render, screen } from '@testing-library/react';
import { DevDXExtensionsKPICard } from './index';

const makePConnect = () => () => ({ getInheritedProps: () => ({}) });

describe('DevDXExtensionsKPICard', () => {
  test('renders value and label', () => {
    render(
      <DevDXExtensionsKPICard
        label='Open Cases'
        value='142'
        color='#2563eb'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByTestId('kpi-value')).toHaveTextContent('142');
    expect(screen.getByTestId('kpi-label')).toHaveTextContent('Open Cases');
  });

  test('falls back to inherited props', () => {
    const makePConnectWithInherited = () => () => ({
      getInheritedProps: () => ({ label: 'Inherited Label', value: '99' })
    });
    render(
      <DevDXExtensionsKPICard
        getPConnect={makePConnectWithInherited()}
      />
    );
    expect(screen.getByTestId('kpi-value')).toHaveTextContent('99');
    expect(screen.getByTestId('kpi-label')).toHaveTextContent('Inherited Label');
  });

  test('renders card container', () => {
    render(
      <DevDXExtensionsKPICard
        label='Test'
        value='1'
        color='#000'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByTestId('kpi-card')).toBeVisible();
  });
});
