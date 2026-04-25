import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsScreenFlowForm } from './index';

const makeFinishAssignment = () => jest.fn().mockResolvedValue({});
const makeCancelAction = () => jest.fn();

const makePConnect = (
  finishAssignment = makeFinishAssignment(),
  cancelAction = makeCancelAction()
) => () => ({
  getContextName: () => 'assignment_1',
  getInheritedProps: () => ({}),
  getActionsApi: () => ({ finishAssignment, cancelAction })
});

const STEP_LABELS = 'Personal Info,Contact Details,Review,Submit';

const baseProps = {
  heading: 'Personal Information',
  stepLabels: STEP_LABELS,
  showStepProgress: true,
  showNavigationButtons: true,
  labelPrevious: 'Previous',
  labelNext: 'Next',
  labelSubmit: 'Submit'
};

const fields = <div data-testid='form-fields'>Form Fields</div>;

describe('DevDXExtensionsScreenFlowForm', () => {
  // ── Stepper ──────────────────────────────────────────────────────────────

  test('renders all step labels in the stepper', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByText('Personal Info')).toBeVisible();
    expect(screen.getByText('Contact Details')).toBeVisible();
    expect(screen.getByText('Review')).toBeVisible();
    expect(screen.getByText('Submit')).toBeVisible();
  });

  test('active step circle shows the current step number', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={2} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    const circles = screen.getAllByRole('listitem').map(li =>
      li.querySelector('[data-state]')
    );
    expect(circles[0]).toHaveAttribute('data-state', 'complete');
    expect(circles[1]).toHaveAttribute('data-state', 'active');
    expect(circles[2]).toHaveAttribute('data-state', 'upcoming');
  });

  test('hides stepper when showStepProgress is false', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} showStepProgress={false} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.queryByRole('list', { name: 'Form progress' })).toBeNull();
  });

  // ── Heading and fields ───────────────────────────────────────────────────

  test('renders the step heading', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByTestId('screen-flow-heading')).toHaveTextContent('Personal Information');
  });

  test('renders form fields in the fields wrapper', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByTestId('form-fields')).toBeVisible();
  });

  // ── Navigation — first step ──────────────────────────────────────────────

  test('hides Previous button on first step', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.queryByTestId('btn-previous')).toBeNull();
  });

  test('shows Next button on first step', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByTestId('btn-next')).toBeVisible();
  });

  // ── Navigation — middle step ─────────────────────────────────────────────

  test('shows both Previous and Next on middle steps', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={2} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByTestId('btn-previous')).toBeVisible();
    expect(screen.getByTestId('btn-next')).toBeVisible();
    expect(screen.queryByTestId('btn-submit')).toBeNull();
  });

  // ── Navigation — last step ───────────────────────────────────────────────

  test('shows Submit instead of Next on the last step', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={4} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.getByTestId('btn-submit')).toBeVisible();
    expect(screen.queryByTestId('btn-next')).toBeNull();
  });

  // ── API calls ────────────────────────────────────────────────────────────

  test('Next button calls finishAssignment with the context name', () => {
    const finishAssignment = makeFinishAssignment();
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={1} getPConnect={makePConnect(finishAssignment)}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    fireEvent.click(screen.getByTestId('btn-next'));
    expect(finishAssignment).toHaveBeenCalledWith(
      'assignment_1',
      expect.objectContaining({ outcomeID: '' })
    );
  });

  test('Submit button calls finishAssignment on the last step', () => {
    const finishAssignment = makeFinishAssignment();
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={4} getPConnect={makePConnect(finishAssignment)}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    fireEvent.click(screen.getByTestId('btn-submit'));
    expect(finishAssignment).toHaveBeenCalledTimes(1);
  });

  test('Previous button calls cancelAction', () => {
    const cancelAction = makeCancelAction();
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={2} getPConnect={makePConnect(makeFinishAssignment(), cancelAction)}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    fireEvent.click(screen.getByTestId('btn-previous'));
    expect(cancelAction).toHaveBeenCalledWith('assignment_1');
  });

  // ── No navigation buttons ────────────────────────────────────────────────

  test('hides all navigation buttons when showNavigationButtons is false', () => {
    render(
      <DevDXExtensionsScreenFlowForm {...baseProps} currentStep={2} showNavigationButtons={false} getPConnect={makePConnect()}>
        {fields}
      </DevDXExtensionsScreenFlowForm>
    );
    expect(screen.queryByTestId('screen-flow-actions')).toBeNull();
  });
});
