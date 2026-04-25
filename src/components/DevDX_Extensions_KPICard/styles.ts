import styled, { css } from 'styled-components';

export const StyledCard = styled.div<{ $color: string }>(
  ({ $color }) => css`
    flex: 1 1 140px;
    padding: 1.25rem 1rem;
    border: 2px solid ${$color};
    border-radius: 0.5rem;
    text-align: center;
    background: #fff;
    box-sizing: border-box;
  `
);

export const StyledValue = styled.div<{ $color: string }>(
  ({ $color }) => css`
    font-size: 2rem;
    font-weight: 700;
    color: ${$color};
    line-height: 1.2;
  `
);

export const StyledLabel = styled.div`
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;
