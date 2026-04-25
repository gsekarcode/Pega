import styled, { css } from 'styled-components';

// Outer flex row — full height of the container
export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
  `
);

// Left sidebar — fixed width, scrollable if content overflows
export const StyledLeftPanel = styled.nav(() =>
  css`
    width: 240px;
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    box-sizing: border-box;
    overflow-y: auto;
  `
);

// Individual nav button — full-width, left-aligned, left-accent on active
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
    color: #374151;
    line-height: 1.4;
    box-sizing: border-box;
    transition: background 0.1s ease, border-color 0.1s ease;

    &[data-active='true'] {
      background: #eff6ff;
      border-left-color: #2563eb;
      font-weight: 600;
      color: #1d4ed8;
    }

    &:hover:not([data-active='true']) {
      background: #f3f4f6;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
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
