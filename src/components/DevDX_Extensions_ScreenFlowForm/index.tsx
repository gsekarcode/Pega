import { withConfiguration, Button } from '@pega/cosmos-react-core';

import type { PConnProps } from './PConnProps';
import './create-nonce';
import {
  StyledWrapper,
  StyledStepper,
  StyledStep,
  StyledStepCircle,
  StyledStepConnector,
  StyledHeading,
  StyledFieldsWrapper,
  StyledActionBar,
  HideActionButtons
} from './styles';

interface ScreenFlowFormProps extends PConnProps {
  heading?: string;
  /** Comma-separated list of step names, e.g. "Personal Info,Contact Details,Review,Submit" */
  stepLabels?: string;
  /** 1-based index of the current step */
  currentStep?: number | string;
  showStepProgress?: boolean | string;
  showNavigationButtons?: boolean | string;
  labelPrevious?: string;
  labelNext?: string;
  labelSubmit?: string;
  children?: any;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

const coerceInt = (val: number | string | undefined, fallback: number): number => {
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : fallback;
};

export const DevDXExtensionsScreenFlowForm = (props: ScreenFlowFormProps) => {
  const {
    getPConnect,
    heading = '',
    stepLabels = 'Step 1,Step 2,Step 3',
    labelPrevious = 'Previous',
    labelNext = 'Next',
    labelSubmit = 'Submit',
    children
  } = props;

  const showStepProgress = coerceBool(props.showStepProgress, true);
  const showNavigationButtons = coerceBool(props.showNavigationButtons, true);
  const currentStep = coerceInt(props.currentStep, 1);

  const steps = String(stepLabels)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const pConn = getPConnect();
  const contextName = pConn.getContextName();

  // Advance the flow to the next screen (or submit on the last screen)
  const handleNext = () => {
    pConn.getActionsApi().finishAssignment(contextName, {
      outcomeID: ''
    });
  };

  // Go back to the previous screen
  const handlePrevious = () => {
    pConn.getActionsApi().navigateToStep('previous', contextName);
  };

  // Cancel the entire flow
  // Derive the visual state of each step
  const getStepState = (index: number): 'complete' | 'active' | 'upcoming' => {
    if (index + 1 < currentStep) return 'complete';
    if (index + 1 === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <StyledWrapper>
      <HideActionButtons />
      {/* ── Step progress indicator ─────────────────────────────────────── */}
      {showStepProgress && steps.length > 1 && (
        <StyledStepper role='list' aria-label='Form progress'>
          {steps.map((label, i) => {
            const state = getStepState(i);
            const connectorState = state === 'upcoming' && i >= currentStep ? 'upcoming' : 'done';
            let stepSuffix = '';
            if (state === 'complete') stepSuffix = ' (completed)';
            else if (state === 'active') stepSuffix = ' (current)';
            return (
              <StyledStep key={label} role='listitem'>
                {i > 0 && <StyledStepConnector data-state={connectorState} />}
                <StyledStepCircle
                  data-state={state}
                  aria-label={`Step ${i + 1}: ${label}${stepSuffix}`}
                >
                  <span>{state === 'complete' ? '✓' : i + 1}</span>
                  <span>{label}</span>
                </StyledStepCircle>
              </StyledStep>
            );
          })}
        </StyledStepper>
      )}

      {/* ── Step heading ────────────────────────────────────────────────── */}
      {heading && (
        <StyledHeading data-testid='screen-flow-heading'>{heading}</StyledHeading>
      )}

      {/* ── Form fields for this screen ─────────────────────────────────── */}
      <StyledFieldsWrapper data-testid='screen-flow-fields'>
        {children}
      </StyledFieldsWrapper>

      {/* ── Navigation buttons ──────────────────────────────────────────── */}
      {showNavigationButtons && (
        <StyledActionBar data-testid='screen-flow-actions'>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Previous — hidden on the first step */}
            {!isFirstStep && (
              <Button variant='secondary' onClick={handlePrevious} data-testid='btn-previous'>
                {labelPrevious}
              </Button>
            )}

            {/* Next on middle steps, Submit on the last step */}
            <Button variant='primary' onClick={handleNext} data-testid={isLastStep ? 'btn-submit' : 'btn-next'}>
              {isLastStep ? labelSubmit : labelNext}
            </Button>
          </div>
        </StyledActionBar>
      )}
    </StyledWrapper>
  );
};

export default withConfiguration(DevDXExtensionsScreenFlowForm);
