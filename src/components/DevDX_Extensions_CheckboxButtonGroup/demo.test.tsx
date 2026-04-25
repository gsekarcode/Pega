import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsCheckboxButtonGroup } from './index';

const makeUpdateFieldValue = () => jest.fn();
const makeTriggerFieldChange = () => jest.fn();

const makePConnect = (
  updateFieldValue = makeUpdateFieldValue(),
  triggerFieldChange = makeTriggerFieldChange()
) => () => ({
  getStateProps: () => ({ value: '.Tags' }),
  getActionsApi: () => ({ updateFieldValue, triggerFieldChange }),
  ignoreSuggestion: jest.fn(),
  getInheritedProps: () => ({})
});

const OPTIONS = 'R:Red,G:Green,B:Blue,Y:Yellow';

const baseProps = {
  label: 'Colours',
  optionsList: OPTIONS,
  testId: 'cbg'
};

describe('DevDXExtensionsCheckboxButtonGroup', () => {
  test('renders all options as buttons', () => {
    render(<DevDXExtensionsCheckboxButtonGroup {...baseProps} value='' getPConnect={makePConnect()} />);
    expect(screen.getByRole('button', { name: 'Red' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Green' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Blue' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Yellow' })).toBeVisible();
  });

  test('renders the field label', () => {
    render(<DevDXExtensionsCheckboxButtonGroup {...baseProps} value='' getPConnect={makePConnect()} />);
    expect(screen.getByText('Colours')).toBeVisible();
  });

  test('pre-selected options have aria-pressed=true', () => {
    render(<DevDXExtensionsCheckboxButtonGroup {...baseProps} value='R,B' getPConnect={makePConnect()} />);
    expect(screen.getByRole('button', { name: 'Red' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Green' })).toHaveAttribute('aria-pressed', 'false');
  });

  test('clicking an unselected button selects it and calls updateFieldValue', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsCheckboxButtonGroup {...baseProps} value='' getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Green' }));
    expect(screen.getByRole('button', { name: 'Green' })).toHaveAttribute('aria-pressed', 'true');
    expect(updateFieldValue).toHaveBeenCalledWith('.Tags', 'G');
  });

  test('clicking a selected button deselects it', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsCheckboxButtonGroup {...baseProps} value='R,G' getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Red' }));
    expect(screen.getByRole('button', { name: 'Red' })).toHaveAttribute('aria-pressed', 'false');
    expect(updateFieldValue).toHaveBeenCalledWith('.Tags', 'G');
  });

  test('multiple items can be selected simultaneously', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsCheckboxButtonGroup {...baseProps} value='' getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Red' }));
    fireEvent.click(screen.getByRole('button', { name: 'Blue' }));
    expect(screen.getByRole('button', { name: 'Red' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Blue' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('disabled buttons cannot be clicked', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsCheckboxButtonGroup {...baseProps} value='' disabled getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Red' }));
    expect(updateFieldValue).not.toHaveBeenCalled();
  });

  test('readOnly buttons cannot be clicked', () => {
    const updateFieldValue = makeUpdateFieldValue();
    render(
      <DevDXExtensionsCheckboxButtonGroup {...baseProps} value='R' readOnly getPConnect={makePConnect(updateFieldValue)} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Green' }));
    expect(updateFieldValue).not.toHaveBeenCalled();
  });

  test('shows validation error message', () => {
    render(
      <DevDXExtensionsCheckboxButtonGroup
        {...baseProps}
        value=''
        validatemessage='Please select at least one option'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Please select at least one option');
  });

  test('DISPLAY_ONLY shows comma-separated selected labels', () => {
    render(
      <DevDXExtensionsCheckboxButtonGroup
        {...baseProps}
        value='R,B'
        displayMode='DISPLAY_ONLY'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('Red, Blue')).toBeVisible();
  });

  test('DISPLAY_ONLY shows em dash when nothing is selected', () => {
    render(
      <DevDXExtensionsCheckboxButtonGroup
        {...baseProps}
        value=''
        displayMode='DISPLAY_ONLY'
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getByText('—')).toBeVisible();
  });

  test('renders 30 options without error', () => {
    const thirtyOptions = Array.from({ length: 30 }, (_, i) => `Option${i + 1}`).join(',');
    render(
      <DevDXExtensionsCheckboxButtonGroup
        {...baseProps}
        optionsList={thirtyOptions}
        value=''
        getPConnect={makePConnect()}
      />
    );
    expect(screen.getAllByRole('button')).toHaveLength(30);
  });
});
