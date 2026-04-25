import styled, { css } from 'styled-components';

export const StyledSSNWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `
);

export const StyledToggleButton = styled.button(() =>
  css`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 0.8125rem;
    text-decoration: underline;
    color: inherit;
    align-self: flex-start;

    &:hover {
      opacity: 0.75;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
      border-radius: 2px;
    }
  `
);
