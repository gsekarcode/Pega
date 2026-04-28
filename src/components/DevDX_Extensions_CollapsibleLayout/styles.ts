import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const StyledWrapper = styled.div(() => css`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`);

export const StyledHeader = styled.div<{ $collapsible: boolean; $expanded: boolean; $background: string }>(
  ({ $collapsible, $expanded, $background }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: ${$background};
    border-bottom: ${$collapsible && $expanded ? '1px solid #e0e0e0' : 'none'};
    cursor: ${$collapsible ? 'pointer' : 'default'};
    user-select: none;

    &:hover {
      filter: ${$collapsible ? 'brightness(0.96)' : 'none'};
    }
  `
);

export const StyledTitle = styled.span(() => css`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
  flex: 1;
`);


export const StyledChevron = styled.span<{ $expanded: boolean }>(
  ({ $expanded }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: #555;
    transition: transform 0.25s ease, background 0.15s ease;
    transform: rotate(${$expanded ? '0deg' : '-90deg'});

    svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `
);

export const StyledBody = styled.div(() => css`
  padding: 18px;
  animation: ${fadeIn} 0.2s ease;
`);

export const StyledRegion = styled.div(() => css`
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
`);
