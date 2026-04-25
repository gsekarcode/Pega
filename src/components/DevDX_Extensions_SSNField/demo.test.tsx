import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsSSNField } from './index';

const makePConnect = () => () => ({
  getStateProps: () => ({ value: '.SSN' }),
  getActionsApi: () => ({
    updateFieldValue: jest.fn(),
    triggerFieldChange: jest.fn()
  }),
  ignoreSuggestion: jest.fn(),
  getInheritedProps: () => ({})
});

describe('DevDXExtensionsSSNField', () => {
  test('renders label and placeholder', () => {
    render(
      <DevDXExtensionsSSNField
        label='Social Security Number'
        value=''
        placeholder='###-##-####'
        getPConnect={makePConnect()}
        testId='ssn-field'
      />
    );
    expect(screen.getByText('Social Security Number')).toBeVisible();
    expect(screen.getByTestId('ssn-field')).toBeVisible();
  });

  test('masks a complete SSN by default and shows Show button', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123456789'
        getPConnect={makePConnect()}
        testId='ssn-masked'
      />
    );
    const input = screen.getByTestId('ssn-masked');
    expect(input).toHaveValue('•••-••-6789');
    expect(screen.getByRole('button', { name: 'Show SSN' })).toBeVisible();
  });

  test('reveals full SSN when Show button is clicked', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123456789'
        getPConnect={makePConnect()}
        testId='ssn-reveal'
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show SSN' }));
    expect(screen.getByTestId('ssn-reveal')).toHaveValue('123-45-6789');
    expect(screen.getByRole('button', { name: 'Hide SSN' })).toBeVisible();
  });

  test('hides SSN again when Hide button is clicked', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123456789'
        getPConnect={makePConnect()}
        testId='ssn-toggle'
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show SSN' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hide SSN' }));
    expect(screen.getByTestId('ssn-toggle')).toHaveValue('•••-••-6789');
  });

  test('renders masked display in DISPLAY_ONLY mode', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123456789'
        displayMode='DISPLAY_ONLY'
        getPConnect={makePConnect()}
        testId='ssn-display'
      />
    );
    expect(screen.getByText('•••-••-6789')).toBeVisible();
    expect(screen.queryByTestId('ssn-display')).toBeNull();
  });

  test('shows error status when validatemessage is set', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123'
        validatemessage='Please enter a valid 9-digit SSN'
        getPConnect={makePConnect()}
        testId='ssn-error'
      />
    );
    expect(screen.getByText('Please enter a valid 9-digit SSN')).toBeVisible();
  });

  test('does not show toggle button when readOnly', () => {
    render(
      <DevDXExtensionsSSNField
        label='SSN'
        value='123456789'
        readOnly
        getPConnect={makePConnect()}
        testId='ssn-readonly'
      />
    );
    expect(screen.queryByRole('button', { name: /SSN/i })).toBeNull();
  });
});
