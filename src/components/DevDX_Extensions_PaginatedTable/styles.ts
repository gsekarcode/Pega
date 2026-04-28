import styled, { css } from 'styled-components';

export const StyledContainer = styled.div(() => css`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`);

export const StyledTableWrapper = styled.div<{ $zebra: boolean }>(
  ({ $zebra }) => css`
    width: 100%;
    overflow-x: auto;

    ${$zebra && css`
      table tbody tr:nth-child(odd) td {
        background-color: #ffffff;
      }
      table tbody tr:nth-child(even) td {
        background-color: #f3f6fb;
      }
    `}
  `
);

export const StyledFooter = styled.div(() => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
  gap: 12px;
  flex-wrap: wrap;
`);

export const StyledPageSizeRow = styled.div(() => css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #555;

  select {
    padding: 3px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    background: #fff;
  }
`);

export const StyledRowCount = styled.span(() => css`
  font-size: 0.8rem;
  color: #888;
`);

export const StyledEmptyState = styled.div(() => css`
  padding: 40px;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
`);

export const StyledError = styled.div(() => css`
  padding: 12px 16px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 0.85rem;
`);

export const StyledTitle = styled.div(() => css`
  padding: 14px 18px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
`);
