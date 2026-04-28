import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const StyledWrapper = styled.div(() => css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`);

export const StyledFeedback = styled.div<{ $type: 'success' | 'error' }>(
  ({ $type }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    animation: ${fadeIn} 0.2s ease;
    background: ${$type === 'success' ? '#f0fdf4' : '#fef2f2'};
    color:      ${$type === 'success' ? '#15803d' : '#b91c1c'};
    border:     1px solid ${$type === 'success' ? '#bbf7d0' : '#fecaca'};
  `
);
