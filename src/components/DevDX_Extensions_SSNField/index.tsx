import { useState, useEffect, useRef } from 'react';
import { withConfiguration, Input, FieldValueList, Text } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import { StyledSSNWrapper, StyledToggleButton } from './styles';

interface SSNFieldProps extends PConnFieldProps {
  hasSuggestions?: boolean;
  variant?: any;
}

// Formats a raw string into ###-##-#### (stops at 9 digits)
const formatSSN = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

// Masks a complete SSN so only the last 4 digits are visible: •••-••-6789
const maskSSN = (formatted: string): string => {
  const digits = formatted.replace(/\D/g, '');
  if (digits.length < 9) return formatted;
  return `•••-••-${digits.slice(5)}`;
};

export const DevDXExtensionsSSNField = (props: SSNFieldProps) => {
  const {
    getPConnect,
    label,
    value = '',
    hideLabel = false,
    helperText = '',
    placeholder = '###-##-####',
    validatemessage = '',
    testId = '',
    displayMode,
    variant,
    hasSuggestions = false
  } = props;

  let { readOnly, required, disabled } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    p => p === true || (typeof p === 'string' && p === 'true')
  ) as [boolean, boolean, boolean];

  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;
  const hasValueChange = useRef(false);

  const [inputValue, setInputValue] = useState(formatSSN(String(value ?? '')));
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<'pending' | 'error' | 'success' | 'warning' | undefined>(hasSuggestions ? 'pending' : undefined);

  useEffect(() => {
    setInputValue(formatSSN(String(value ?? '')));
  }, [value]);

  useEffect(() => {
    if (validatemessage) {
      setStatus('error');
    } else if (!hasSuggestions) {
      setStatus(undefined);
    }
  }, [validatemessage, hasSuggestions]);

  const rawDigits = inputValue.replace(/\D/g, '');
  const maskedDisplay = maskSSN(inputValue);

  // Show actual SSN when: user is actively editing OR the show toggle is on
  const displayValue = isVisible || isFocused ? inputValue : maskedDisplay;

  // Read / display-only branches
  if (displayMode === 'DISPLAY_ONLY') {
    return <Text>{maskedDisplay}</Text>;
  }
  if (displayMode === 'LABELS_LEFT') {
    return (
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: maskedDisplay }]}
      />
    );
  }
  if (displayMode === 'STACKED_LARGE_VAL') {
    return (
      <Text variant='h1' as='span'>
        {maskedDisplay}
      </Text>
    );
  }

  return (
    <StyledSSNWrapper>
      <Input
        label={label}
        labelHidden={hideLabel}
        info={validatemessage || helperText}
        data-testid={testId}
        value={displayValue}
        status={status}
        placeholder={placeholder}
        disabled={disabled as boolean}
        readOnly={readOnly as boolean}
        required={required as boolean}
        onFocus={() => setIsFocused(true)}
        onChange={(e: any) => {
          if (hasSuggestions) setStatus(undefined);
          const formatted = formatSSN(e.currentTarget.value);
          setInputValue(formatted);
          const raw = formatted.replace(/\D/g, '');
          const currentRaw = String(value ?? '').replace(/\D/g, '');
          if (currentRaw !== raw) {
            actions.updateFieldValue(propName, formatted);
            hasValueChange.current = true;
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          if ((!value || hasValueChange.current) && !readOnly) {
            actions.triggerFieldChange(propName, inputValue);
            if (hasSuggestions) (pConn as any).ignoreSuggestion();
            hasValueChange.current = false;
          }
        }}
      />
      {!readOnly && !disabled && rawDigits.length > 0 && (
        <StyledToggleButton
          type='button'
          onClick={() => setIsVisible(v => !v)}
          aria-label={isVisible ? 'Hide SSN' : 'Show SSN'}
        >
          {isVisible ? 'Hide' : 'Show'}
        </StyledToggleButton>
      )}
    </StyledSSNWrapper>
  );
};

export default withConfiguration(DevDXExtensionsSSNField);
