// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { DevDXExtensionsNavButton } from './index';

const makePConnect = () => () => ({
  getContextName: () => 'app/primary_1',
  getActionsApi: () => ({ openLocalAction: jest.fn() })
});

describe('DevDXExtensionsNavButton', () => {
  it('renders button with correct label', () => {
    render(
      <DevDXExtensionsNavButton
        buttonLabel='Open Case'
        className='APP-WORK-SR'
        pageName='pyStartCase'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByRole('button', { name: 'Open Case' })).toBeInTheDocument();
  });

  it('disables button when pageName is missing', () => {
    render(
      <DevDXExtensionsNavButton
        buttonLabel='Open'
        className='APP-WORK-SR'
        pageName=''
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
