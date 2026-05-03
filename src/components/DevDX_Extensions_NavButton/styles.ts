import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div(() =>
  css`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `
);

export const StyledLabel = styled.label(() =>
  css`
    font-size: 0.8125rem;
    font-weight: 500;
    color: #374151;
  `
);
