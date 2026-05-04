import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
  `
);

export const StyledHeader = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `
);

export const StyledHeading = styled.h2(() =>
  css`
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  `
);

export const StyledDescription = styled.p(() =>
  css`
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
  `
);

// ── Loading state ─────────────────────────────────────────────────────────────

export const StyledLoadingBar = styled.div(() =>
  css`
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, #e5e7eb 25%, #bfdbfe 50%, #e5e7eb 75%);
    background-size: 400px 100%;
    animation: ${shimmer} 1.2s infinite linear;
  `
);

export const StyledLoadingLabel = styled.p(() =>
  css`
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    text-align: center;
  `
);

// ── Success card ──────────────────────────────────────────────────────────────

export const StyledCaseCard = styled.div(() =>
  css`
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
  `
);

export const StyledCaseCardHeader = styled.div(() =>
  css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #f0fdf4;
    border-bottom: 1px solid #bbf7d0;
  `
);

export const StyledSuccessIcon = styled.span(() =>
  css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #16a34a;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  `
);

export const StyledCaseCardTitle = styled.span(() =>
  css`
    font-size: 0.875rem;
    font-weight: 600;
    color: #15803d;
  `
);

export const StyledCaseID = styled.p(() =>
  css`
    margin: 0;
    padding: 0.5rem 1rem 0.75rem;
    font-size: 0.875rem;
    color: #6b7280;
  `
);

// ── Action bar ────────────────────────────────────────────────────────────────

export const StyledActionBar = styled.div(() =>
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
  `
);

// ── Error ─────────────────────────────────────────────────────────────────────

export const StyledError = styled.div(() =>
  css`
    padding: 0.75rem 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #dc2626;
  `
);
