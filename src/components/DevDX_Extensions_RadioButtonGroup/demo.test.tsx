import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsRadioButtonGroup } from './index';

const makeUpdateFieldValue = () => jest.fn();
const makeTriggerFieldChange = () => jest.fn();

const makePConnect = (
  updateFieldValue = makeUpdateFieldValue(),
  triggerFieldChange = makeTriggerFieldChange()
) => () => ({
  getStateProps: () => ({ value: '.Choice' }),
  getActionsApi: () => ({ updateFieldValue, triggerFieldChange }),
  ignoreSuggestion: jest.fn(),
  getInheritedProps: () => ({})
});

const OPTIONS = 'Y:Yes,N:No,M:Maybe';
const baseProps = { label: 'Answer', optionsList: OPTIONS, testId: 'rbg' };

describe('DevDXExtensionsRadioButtonGroup', () => {
  test('renders all options as buttons', () => {
    render(<DevDXExtensionsRadioButtonGroup {...baseProps} value='' getPConnect={makePConnect()} />);
    expect(screen.getByRole('radio', { name: 'Yes' })).toBeVisible();
    expect(screen.getByRole('radio', { name: 'No' })).toBeVisible();
    expect(screen.getByRole('radio', { name: 'Maybe' })).toBeVisible();
  });

  test('renders the field label', () => {
    render(<DevDXExtensionsRadioButtonGroup {...baseProps} value='' getPConnect={makePConnect()} />);
    expect(screen.getByText('Answer')).toBeVisible();
  });

  test('pre-selected option has aria-checked=true', () => {
    render(<DevDXExtensionsRadioButtonGroup {...baseProps} value='N' getPConnect={makePConnect()} />);
    expect(screen.getByRole('radio', { name: 'No' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Yes' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('radio', { name: 'Maybe' })).toHaveAttribute('aria-checked', 'false');
  });

  test('clicking an option selects it and calls updateFieldValue + triggerFieldChange', () => {
    const updateFieldValue = makeUpdateFieldValue();
    const triggerFieldChange = makeTriggerFieldChange();
    render(
      <DevDXExtensionsRadioButtonGroup
        {...baseProps}
        value=''
        getPConnect={makePConnect(updateFieldValue, triggerFieldChange)}
      />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
    expect(screen.getByRole('radio', { name: 'Yes' })).toHaveAttribute('aria-checked', 'true');
    expect(updateFieldValue).toHaveBeenCalledWith('.Choice', 'Y');
    expect(triggerFieldChange).toHaveBeenCalledWith('.Choice', 'Y');
  });

  test('clicking a different option switches the selection', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsRadioButtonGroup {...baseProps} value='Y' getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    expect(screen.getByRole('radio', { name: 'No' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Yes' })).toHaveAttribute('aria-checked', 'false');
    expect(updateFieldValue).toHaveBeenCalledWith('.Choice', 'N');
  });

  test('clicking the already-selected option does not call updateFieldValue', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsRadioButtonGroup {...baseProps} value='Y' getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
    expect(updateFieldValue).not.toHaveBeenCalled();
  });

  test('only one option can be selected at a time', () => {
    render(<DevDXExtensionsRadioButtonGroup {...baseProps} value='Y' getPConnect={makePConnect()} />);
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    const checked = screen
      .getAllByRole('radio')
      .filter(el => el.getAttribute('aria-checked') === 'true');
    expect(checked).toHaveLength(1);
  });

  test('disabled buttons cannot be clicked', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsRadioButtonGroup {...baseProps} value='' disabled getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Yes' }));
    expect(updateFieldValue).not.toHaveBeenCalled();
  });

  test('readOnly buttons cannot be clicked', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsRadioButtonGroup {...baseProps} value='Y' readOnly getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'No' }));
    expect(updateFieldValue).not.toHaveBeenCalled();
  });

  test('shows validation error message', () => {
    render(
      <DevDXExtensionsRadioButtonGroup
        {...baseProps}
        value=''
        validatemessage='Please select an option'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Please select an option');
  });

  test('DISPLAY_ONLY shows the label of the selected key', () => {
    render(
      <DevDXExtensionsRadioButtonGroup
        {...baseProps}
        value='M'
        displayMode='DISPLAY_ONLY'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('Maybe')).toBeVisible();
  });

  test('each button has an inline flex style proportional to item count', () => {
    render(<DevDXExtensionsRadioButtonGroup {...baseProps} value='' getPConnect={makePConnect()} />);
    const buttons = screen.getAllByRole('radio');
    // 3 options → each button should have flex basis ~33%
    buttons.forEach(btn => {
      expect(btn).toHaveStyle('flex: 1 0 calc(33.333333333333336% - 0.5rem)');
    });
  });
});
