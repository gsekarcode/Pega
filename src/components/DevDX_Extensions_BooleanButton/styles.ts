import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div(() => css`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`);

export const StyledLabel = styled.label(() => css`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #374151;
`);

export const StyledRequired = styled.span(() => css`
  color: #dc2626;
  margin-left: 2px;
`);

export const StyledButtonRow = styled.div(() => css`
  display: inline-flex;
  align-items: flex-end;
  gap: 10px;
`);

export const StyledToggleButton = styled.button<{ $active: boolean }>(
  ({ $active }) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid #2563eb;
    background: ${$active ? '#1d4ed8' : '#2563eb'};
    color: #ffffff;
    transition: background 0.18s ease;
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35);
    }

    &:hover:not(:disabled) {
      background: ${$active ? '#f0fdf4' : '#1d4ed8'};
      border-color: ${$active ? '#16a34a' : '#1d4ed8'};
    }

    svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `
);

export const StyledHelperText = styled.span(() => css`
  font-size: 0.75rem;
  color: #6b7280;
`);

export const StyledErrorText = styled.span(() => css`
  font-size: 0.75rem;
  color: #dc2626;
`);

export const StyledDisplayValue = styled.span<{ $active: boolean }>(
  ({ $active }) => css`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${$active ? '#16a34a' : '#6b7280'};
  `
);
