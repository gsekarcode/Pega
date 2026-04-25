import { useState, useEffect, useRef } from 'react';
import { withConfiguration, FieldValueList, Text } from '@pega/cosmos-react-core';

import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import {
  StyledGroupWrapper,
  StyledLabel,
  StyledButtonGroup,
  StyledToggleButton,
  StyledHelperText,
  StyledErrorText
} from './styles';

interface CheckboxButtonGroupProps extends PConnFieldProps {
  /** Comma-separated options. Format: "Label" or "key:Label" e.g. "R:Red,G:Green,B:Blue" */
  optionsList?: string;
  hasSuggestions?: boolean;
  variant?: any;
}

/** Parse "R:Red,G:Green,B:Blue" or "Red,Green,Blue" into [{ key, label }] */
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

/** Parse comma-separated selected keys into a Set */
const parseSelected = (value: any): Set<string> =>
  new Set(
    String(value ?? '')
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
  );

/** Serialise a Set back to comma-separated string */
const serialise = (set: Set<string>) => Array.from(set).join(',');

export const DevDXExtensionsCheckboxButtonGroup = (props: CheckboxButtonGroupProps) => {
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
  const [selected, setSelected] = useState<Set<string>>(() => parseSelected(value));
  const [status, setStatus] = useState<string | undefined>(hasSuggestions ? 'pending' : undefined);

  useEffect(() => { setSelected(parseSelected(value)); }, [value]);

  useEffect(() => {
    if (validatemessage) setStatus('error');
    else if (!hasSuggestions) setStatus(undefined);
  }, [validatemessage, hasSuggestions]);

  const toggleOption = (key: string) => {
    if (readOnly || disabled) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      const newValue = serialise(next);
      actions.updateFieldValue(propName, newValue);
      hasValueChange.current = true;
      return next;
    });
  };

  const handleBlur = () => {
    if (hasValueChange.current && !readOnly) {
      actions.triggerFieldChange(propName, serialise(selected));
      if (hasSuggestions) (pConn as any).ignoreSuggestion();
      hasValueChange.current = false;
    }
  };

  // Selected labels for read-only display
  const selectedLabels = options
    .filter(o => selected.has(o.key))
    .map(o => o.label)
    .join(', ') || '—';

  if (displayMode === 'DISPLAY_ONLY') {
    return <Text>{selectedLabels}</Text>;
  }
  if (displayMode === 'LABELS_LEFT') {
    return (
      <FieldValueList
        variant={hideLabel ? 'stacked' : variant}
        data-testid={testId}
        fields={[{ id: '1', name: hideLabel ? '' : label, value: selectedLabels }]}
      />
    );
  }
  if (displayMode === 'STACKED_LARGE_VAL') {
    return <Text variant='h1' as='span'>{selectedLabels}</Text>;
  }

  return (
    <StyledGroupWrapper data-testid={testId} onBlur={handleBlur}>
      {!hideLabel && (
        <StyledLabel data-required={required ? 'true' : 'false'}>
          {label}
        </StyledLabel>
      )}

      <StyledButtonGroup
        role='group'
        aria-label={label}
        data-required={required || undefined}
        data-status={status}
      >
        {options.map(option => {
          const isSelected = selected.has(option.key);
          return (
            <StyledToggleButton
              key={option.key}
              type='button'
              aria-pressed={isSelected}
              data-selected={isSelected ? 'true' : 'false'}
              disabled={disabled as boolean}
              data-readonly={readOnly ? 'true' : 'false'}
              onClick={() => toggleOption(option.key)}
            >
              {option.label}
            </StyledToggleButton>
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

export default withConfiguration(DevDXExtensionsCheckboxButtonGroup);
