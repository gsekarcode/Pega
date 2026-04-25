import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-sizing: border-box;
    width: 100%;
  `
);

export const StyledHeading = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`;

export const StyledCardsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StyledError = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
`;
