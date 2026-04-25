import styled, { css } from 'styled-components';

export const StyledGroupWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    width: 100%;
  `
);

export const StyledLabel = styled.label(() =>
  css`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    line-height: 1.4;

    &[data-required='true']::after {
      content: ' *';
      color: #dc2626;
    }
  `
);

/* Wrapping flex container — handles up to 30 items naturally */
export const StyledButtonGroup = styled.div(() =>
  css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    &[data-status='error'] button {
      border-color: #dc2626;
    }
  `
);

export const StyledToggleButton = styled.button(() =>
  css`
    padding: 0.375rem 0.875rem;
    border-radius: 1rem;
    border: 1.5px solid #d1d5db;
    background: #ffffff;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 400;
    cursor: pointer;
    line-height: 1.4;
    white-space: nowrap;
    transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;

    /* Selected state */
    &[data-selected='true'] {
      background: #eff6ff;
      border-color: #2563eb;
      color: #1d4ed8;
      font-weight: 600;
    }

    /* Hover — unselected only */
    &:hover:not([disabled]):not([data-selected='true']) {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    /* Hover — selected */
    &:hover:not([disabled])[data-selected='true'] {
      background: #dbeafe;
    }

    /* Disabled */
    &[disabled] {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Read-only — looks selected but not interactive */
    &[data-readonly='true'] {
      cursor: default;
      pointer-events: none;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  `
);

export const StyledHelperText = styled.span(() =>
  css`
    font-size: 0.8125rem;
    color: #6b7280;
  `
);

export const StyledErrorText = styled.span(() =>
  css`
    font-size: 0.8125rem;
    color: #dc2626;
  `
);
