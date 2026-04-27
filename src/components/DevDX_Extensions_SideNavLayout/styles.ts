import styled, { css } from 'styled-components';

// Outer flex row — stretches to full viewport height
export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    align-items: stretch;
  `
);

// Left sidebar — dark blue, full height
export const StyledLeftPanel = styled.nav(() =>
  css`
    width: 240px;
    flex-shrink: 0;
    background: #1e40af;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    box-sizing: border-box;
    overflow-y: auto;
    align-self: stretch;
  `
);

// Individual nav button — white text on dark blue
export const StyledNavItem = styled.button(() =>
  css`
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1.25rem;
    background: none;
    border: none;
    border-left: 3px solid transparent;
    cursor: pointer;
    font-size: 0.9375rem;
    color: #cbd5e1;
    line-height: 1.4;
    box-sizing: border-box;
    transition: background 0.15s ease, border-color 0.15s ease;

    &[data-active='true'] {
      background: #1d4ed8;
      border-left-color: #bfdbfe;
      font-weight: 600;
      color: #ffffff;
    }

    &:hover:not([data-active='true']) {
      background: #2563eb;
      color: #ffffff;
    }

    &:focus-visible {
      outline: 2px solid #bfdbfe;
      outline-offset: -2px;
    }
  `
);

// Right content area — grows to fill remaining space, scrollable
export const StyledRightPanel = styled.div(() =>
  css`
    flex: 1;
    min-width: 0;
    padding: 1.5rem;
    overflow-y: auto;
    box-sizing: border-box;
  `
);

// Shown when a slot has no content configured
export const StyledEmptyState = styled.p(() =>
  css`
    color: #9ca3af;
    font-style: italic;
    margin: 0;
  `
);

// "← Back" link shown above an inline case view so the user can return to slot content
export const StyledBackButton = styled.button(() =>
  css`
    background: none;
    border: none;
    padding: 0;
    margin-bottom: 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #2563eb;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
      border-radius: 2px;
    }
  `
);
