import styled, { css } from 'styled-components';

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
