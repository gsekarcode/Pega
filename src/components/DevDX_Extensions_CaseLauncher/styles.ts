import styled, { css, keyframes } from 'styled-components';

const StyledCard = styled.article(() =>
  css`
    background-color: #ffffff;
    border-radius: 0.25rem;
    width: 100%;
  `
);

export default StyledCard;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

export const StyledLoadingBar = styled.div(() => css`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #e5e7eb 25%, #2563eb 50%, #e5e7eb 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`);

export const StyledLoadingWrapper = styled.div(() => css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0;
`);
