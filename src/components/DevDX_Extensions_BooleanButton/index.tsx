import { withConfiguration, FieldValueList, Text } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import {
  StyledWrapper,
  StyledLabel,
  StyledRequired,
  StyledButtonRow,
  StyledToggleButton,
  StyledHelperText,
  StyledErrorText,
  StyledDisplayValue
} from './styles';

interface BooleanButtonProps extends PConnFieldProps {
  labelFalse?: string;
  labelTrue?: string;
}

const coerceBool = (val: any): boolean => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val === 'true' || val === '1';
  return Boolean(val);
};

const CheckIcon = () => (
  <svg viewBox='0 0 16 16' aria-hidden='true'>
    <polyline points='3 8 6.5 11.5 13 4.5' />
  </svg>
);

export const DevDXExtensionsBooleanButton = (props: BooleanButtonProps) => {
  const {
    getPConnect,
    label,
    value,
    hideLabel = false,
    helperText = '',
    validatemessage = '',
    testId = '',
    displayMode,
    labelFalse = 'Confirm',
    labelTrue = 'Confirmed'
  } = props;

  const isActive = coerceBool(value);

  let { readOnly, disabled, required } = props;
  [readOnly, disabled, required] = [readOnly, disabled, required].map(
    p => p === true || (typeof p === 'string' && p === 'true')
  ) as [boolean, boolean, boolean];

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = (pConn as any).getStateProps().value;

  const handleClick = () => {
    if (isActive || disabled || readOnly) return;
    const newValue = true;
    actions.updateFieldValue(propName, newValue);
    actions.triggerFieldChange(propName, newValue);
  };

  // ── Display-only modes ──────────────────────────────────────────────────────
  if (displayMode === 'DISPLAY_ONLY') {
    return (
      <StyledDisplayValue $active={isActive} data-testid={testId}>
        {isActive ? labelTrue : labelFalse}
      </StyledDisplayValue>
    );
  }

  if (displayMode === 'LABELS_LEFT') {
    return (
      <FieldValueList
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: isActive ? labelTrue : labelFalse }]}
      />
    );
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <Text variant='h1' as='span' data-testid={testId}>
        {isActive ? labelTrue : labelFalse}
      </Text>
    );
  }

  // ── Editable mode ───────────────────────────────────────────────────────────
  return (
    <StyledWrapper data-testid={testId}>
      {!hideLabel && (
        <StyledLabel>
          {label}
          {required && <StyledRequired aria-hidden='true'>*</StyledRequired>}
        </StyledLabel>
      )}

      <StyledButtonRow>
        <StyledToggleButton
          type='button'
          $active={isActive}
          disabled={isActive || disabled || readOnly}
          onClick={handleClick}
          aria-pressed={isActive}
          aria-label={isActive ? labelTrue : labelFalse}
        >
          {isActive && <CheckIcon />}
          {isActive ? labelTrue : labelFalse}
        </StyledToggleButton>
      </StyledButtonRow>

      {validatemessage && <StyledErrorText role='alert'>{validatemessage}</StyledErrorText>}
      {!validatemessage && helperText && <StyledHelperText>{helperText}</StyledHelperText>}
    </StyledWrapper>
  );
};

export default withConfiguration(DevDXExtensionsBooleanButton);
