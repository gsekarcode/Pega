// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { DevDXExtensionsCaseInitiator } from './index';

const makePConnect = () => () => ({
  getContextName: () => 'app/primary',
  getInheritedProps: () => ({}),
  getActionsApi: () => ({ createWork: jest.fn(), openWork: jest.fn() })
});

describe('DevDXExtensionsCaseInitiator', () => {
  it('renders heading and create button in idle state', () => {
    render(
      <DevDXExtensionsCaseInitiator
        heading='Service Request'
        classFilter='APP-WORK-SR'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('Service Request')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('disables create button when no classFilter', () => {
    render(
      <DevDXExtensionsCaseInitiator
        heading='Test'
        classFilter=''
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
