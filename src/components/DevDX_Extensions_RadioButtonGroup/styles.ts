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

/**
 * Flex row that fills the full width.
 * Each child button gets an equal share via the inline flex style injected
 * by the component (buttonFlex). Gap is kept tight so the buttons tile
 * cleanly into a horizontal bar.
 */
export const StyledButtonGroup = styled.div(() =>
  css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    width: 100%;

    &[data-status='error'] button {
      border-color: #dc2626;
    }
  `
);

export const StyledRadioButton = styled.button(() =>
  css`
    /* flex is set inline by the component to divide space by item count */
    min-width: 3rem;
    padding: 0.5rem 0.5rem;
    border-radius: 0.375rem;
    border: 1.5px solid #d1d5db;
    background: #ffffff;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 400;
    cursor: pointer;
    line-height: 1.4;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;

    /* Selected / active state */
    &[data-selected='true'] {
      background: #2563eb;
      border-color: #2563eb;
      color: #ffffff;
      font-weight: 600;
    }

    /* Hover — unselected only */
    &:hover:not([disabled]):not([data-selected='true']) {
      background: #f3f4f6;
      border-color: #6b7280;
    }

    /* Disabled */
    &[disabled] {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Read-only — not interactive */
    &[data-readonly='true'] {
      cursor: default;
      pointer-events: none;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
      z-index: 1;
      position: relative;
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
