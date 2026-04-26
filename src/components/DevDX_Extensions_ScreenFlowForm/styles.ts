import styled, { css, createGlobalStyle } from 'styled-components';

// Hides Pega's default action bar and header rendered by the harness
export const HideActionButtons = createGlobalStyle`
  main article form > div:nth-child(2) {
    display: none;
  }
  main article form > div > div:nth-child(2) {
    display: none;
  }
  main article form > div > div {
    display: none;
  }
`;

// ── Outer container ───────────────────────────────────────────────────────────
export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  `
);

// ── Step progress ─────────────────────────────────────────────────────────────

export const StyledStepper = styled.div(() =>
  css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  `
);

export const StyledStep = styled.div(() =>
  css`
    display: flex;
    align-items: center;
  `
);

// Horizontal connector line between ovals
export const StyledStepConnector = styled.div(() =>
  css`
    width: 2rem;
    height: 2px;
    background: #e5e7eb;
    flex-shrink: 0;

    &[data-state='done'] {
      background: #2563eb;
    }
  `
);

// Oval pill shape containing step number + label
export const StyledStepCircle = styled.div(() =>
  css`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 1rem;
    border-radius: 2rem;
    font-size: 0.8125rem;
    font-weight: 600;
    white-space: nowrap;
    box-sizing: border-box;
    transition: background 0.2s, border-color 0.2s;

    /* upcoming */
    border: 2px solid #d1d5db;
    background: #fff;
    color: #9ca3af;

    /* complete */
    &[data-state='complete'] {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }

    /* active */
    &[data-state='active'] {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
  `
);

// Hidden — label is now inside the oval
export const StyledStepLabel = styled.span(() =>
  css`
    display: none;
  `
);

// ── Step heading ──────────────────────────────────────────────────────────────
export const StyledHeading = styled.h2(() =>
  css`
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  `
);

// ── Form fields area ──────────────────────────────────────────────────────────
export const StyledFieldsWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  `
);

// ── Navigation buttons ────────────────────────────────────────────────────────
export const StyledActionBar = styled.div(() =>
  css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    gap: 0.5rem;
  `
);
