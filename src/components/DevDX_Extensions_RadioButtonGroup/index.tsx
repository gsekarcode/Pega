import { useState, useEffect, useRef } from 'react';
import { withConfiguration, FieldValueList, Text } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import {
  StyledGroupWrapper,
  StyledLabel,
  StyledButtonGroup,
  StyledRadioButton,
  StyledHelperText,
  StyledErrorText
} from './styles';

interface RadioButtonGroupProps extends PConnFieldProps {
  /** Comma-separated options. Format: "Label" or "key:Label" e.g. "Y:Yes,N:No" */
  optionsList?: string;
  hasSuggestions?: boolean;
  variant?: any;
}

/** Parse "Y:Yes,N:No" or "Yes,No" into [{ key, label }] */
const parseOptions = (raw: string) =>
  String(raw || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(item => {
      const colonIdx = item.indexOf(':');
      if (colonIdx > 0) {
        return { key: item.slice(0, colonIdx).trim(), label: item.slice(colonIdx + 1).trim() };
      }
      return { key: item, label: item };
    });

/**
 * Returns a CSS `flex` value that divides space equally among N buttons.
 * With few items (≤5) each button gets a generous share; with many items
 * each button is narrower so they all fit on one row or wrap cleanly.
 *
 * The formula `1 0 calc(100% / ${count} - 0.5rem)` means:
 *   - can grow into available space
 *   - won't shrink below the calculated base
 *   - base width = equal share of the row, minus the gap
 */
const buttonFlex = (count: number) => `1 0 calc(${100 / count}% - 0.5rem)`;

export const DevDXExtensionsRadioButtonGroup = (props: RadioButtonGroupProps) => {
  const {
    getPConnect,
    label,
    optionsList = '',
    value = '',
    hideLabel = false,
    helperText = '',
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

  const options = parseOptions(optionsList);
  const [selected, setSelected] = useState<string>(String(value ?? ''));
  const [status, setStatus] = useState<string | undefined>(hasSuggestions ? 'pending' : undefined);

  useEffect(() => { setSelected(String(value ?? '')); }, [value]);

  useEffect(() => {
    if (validatemessage) setStatus('error');
    else if (!hasSuggestions) setStatus(undefined);
  }, [validatemessage, hasSuggestions]);

  const selectOption = (key: string) => {
    if (readOnly || disabled || key === selected) return;
    setSelected(key);
    actions.updateFieldValue(propName, key);
    actions.triggerFieldChange(propName, key);
    hasValueChange.current = true;
  };

  // Display label for the selected key
  const selectedLabel =
    options.find(o => o.key === selected)?.label ?? selected ?? '—';

  if (displayMode === 'DISPLAY_ONLY') {
    return <Text>{selectedLabel}</Text>;
  }
  if (displayMode === 'LABELS_LEFT') {
    return (
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: selectedLabel }]}
      />
    );
  }
  if (displayMode === 'STACKED_LARGE_VAL') {
    return <Text variant='h1' as='span'>{selectedLabel}</Text>;
  }

  return (
    <StyledGroupWrapper data-testid={testId}>
      {!hideLabel && (
        <StyledLabel data-required={required ? 'true' : 'false'}>
          {label}
        </StyledLabel>
      )}

      {/* role=radiogroup gives screen readers the correct semantics */}
      <StyledButtonGroup
        role='radiogroup'
        aria-label={label}
        aria-required={required || undefined}
        data-status={status}
        data-count={options.length}
      >
        {options.map(option => {
          const isSelected = option.key === selected;
          return (
            <StyledRadioButton
              key={option.key}
              type='button'
              role='radio'
              aria-checked={isSelected}
              data-selected={isSelected ? 'true' : 'false'}
              disabled={disabled as boolean}
              data-readonly={readOnly ? 'true' : 'false'}
              style={{ flex: buttonFlex(options.length) }}
              onClick={() => selectOption(option.key)}
            >
              {option.label}
            </StyledRadioButton>
          );
        })}
      </StyledButtonGroup>

      {status === 'error' && validatemessage && (
        <StyledErrorText role='alert'>{validatemessage}</StyledErrorText>
      )}
      {!validatemessage && helperText && (
        <StyledHelperText>{helperText}</StyledHelperText>
      )}
    </StyledGroupWrapper>
  );
};

export default withConfiguration(DevDXExtensionsRadioButtonGroup);
