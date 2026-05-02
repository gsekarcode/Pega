import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div(() =>
  css`
    display: inline-flex;
    align-items: center;
  `
);

export const StyledBellButton = styled.button(() =>
  css`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    border-radius: 4px;
    line-height: 0;

    &:hover {
      opacity: 0.8;
      background: rgba(0, 0, 0, 0.06);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `
);

export const StyledBadge = styled.span(() =>
  css`
    position: absolute;
    top: -3px;
    right: -3px;
    background: #ef4444;
    color: #ffffff;
    border-radius: 999px;
    font-size: 0.625rem;
    font-weight: 700;
    min-width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    line-height: 1;
  `
);

export const StyledPopoverHeading = styled.div(() =>
  css`
    padding: 0.625rem 1rem;
    font-weight: 600;
    font-size: 0.875rem;
    color: #1e293b;
    border-bottom: 1px solid #e2e8f0;
  `
);

export const StyledNotifList = styled.ul(() =>
  css`
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 280px;
    max-height: 320px;
    overflow-y: auto;
  `
);

export const StyledNotifItem = styled.li(() =>
  css`
    padding: 0.625rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.875rem;
    color: #1e293b;
    line-height: 1.5;

    &:last-child {
      border-bottom: none;
    }
  `
);

export const StyledNotifDate = styled.div(() =>
  css`
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.2rem;
  `
);

export const StyledEmpty = styled.p(() =>
  css`
    padding: 1rem;
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
    text-align: center;
  `
);
