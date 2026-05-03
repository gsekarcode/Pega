import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const StyledHost = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 200px;
    box-sizing: border-box;
    font-family: inherit;
  `
);

// ── Empty state ───────────────────────────────────────────────────────────────

export const StyledEmptyState = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
    gap: 0.75rem;
    padding: 2rem;
    text-align: center;
    color: #9ca3af;
  `
);

export const StyledEmptyIcon = styled.div(() =>
  css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d1d5db;
  `
);

export const StyledEmptyMessage = styled.p(() =>
  css`
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.5;
    max-width: 280px;
  `
);

// ── Active workarea ───────────────────────────────────────────────────────────

export const StyledActivePanel = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    animation: ${fadeIn} 0.2s ease;
  `
);

export const StyledPanelHeader = styled.div(() =>
  css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  `
);

export const StyledPanelTitle = styled.h3(() =>
  css`
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
  `
);

export const StyledStatusBadge = styled.span<{ status: string }>(({ status }) => {
  const s = (status ?? '').toLowerCase();
  let bg = '#f3f4f6';
  let color = '#6b7280';
  if (s === 'new' || s === 'open') { bg = '#eff6ff'; color = '#2563eb'; }
  else if (s === 'resolved' || s === 'complete') { bg = '#f0fdf4'; color = '#16a34a'; }
  else if (s === 'pending') { bg = '#fefce8'; color = '#ca8a04'; }

  return css`
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    background: ${bg};
    color: ${color};
  `;
});

export const StyledMetaGrid = styled.div(() =>
  css`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.375rem 0.75rem;
    font-size: 0.875rem;
  `
);

export const StyledMetaLabel = styled.span(() =>
  css`
    color: #6b7280;
    font-size: 0.8125rem;
  `
);

export const StyledMetaValue = styled.span(() =>
  css`
    color: #111827;
    font-weight: 500;
    word-break: break-all;
  `
);

export const StyledAssignmentBox = styled.div(() =>
  css`
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `
);

export const StyledAssignmentLabel = styled.p(() =>
  css`
    margin: 0;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #9ca3af;
    font-weight: 600;
  `
);

export const StyledAssignmentName = styled.p(() =>
  css`
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1e293b;
  `
);

export const StyledActionRow = styled.div(() =>
  css`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  `
);

export const StyledDivider = styled.hr(() =>
  css`
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 0;
  `
);
