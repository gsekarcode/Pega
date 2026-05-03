// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { DevDXExtensionsWorkareaHost } from './index';

const makePConnect = () => () => ({
  getContextName: () => 'app/primary_1',
  getInheritedProps: () => ({})
});

describe('DevDXExtensionsWorkareaHost', () => {
  it('renders empty state when PCore is not available', () => {
    render(
      <DevDXExtensionsWorkareaHost
        emptyStateMessage='No active work item.'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('No active work item.')).toBeInTheDocument();
  });
});
