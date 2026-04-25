import styled, { css } from 'styled-components';

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
    align-items: flex-start;
    gap: 0;
    padding: 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  `
);

export const StyledStep = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  `
);

// Horizontal connector line between step circles
export const StyledStepConnector = styled.div(() =>
  css`
    position: absolute;
    top: 1rem; /* vertically centred with the circle */
    right: 50%;
    left: -50%;
    height: 2px;
    background: #e5e7eb;
    z-index: 0;

    &[data-state='done'] {
      background: #2563eb;
    }
  `
);

export const StyledStepCircle = styled.div(() =>
  css`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    transition: background 0.2s, border-color 0.2s;

    /* upcoming — hollow grey */
    border: 2px solid #d1d5db;
    background: #fff;
    color: #9ca3af;

    /* complete — filled blue with checkmark */
    &[data-state='complete'] {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
    }

    /* active — filled blue with step number */
    &[data-state='active'] {
      background: #2563eb;
      border-color: #2563eb;
      color: #fff;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
  `
);

export const StyledStepLabel = styled.span(() =>
  css`
    margin-top: 0.375rem;
    font-size: 0.75rem;
    text-align: center;
    color: #9ca3af;
    max-width: 6rem;
    line-height: 1.2;

    &[data-state='active'] {
      color: #1d4ed8;
      font-weight: 600;
    }

    &[data-state='complete'] {
      color: #374151;
    }
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
