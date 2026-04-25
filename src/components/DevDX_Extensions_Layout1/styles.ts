import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    background: #f5f5f5;
    border-radius: 12px;

    /* Two column layout */
    &.layout-two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    /* Three column layout */
    &.layout-three-column {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }

    /* Single column layout */
    &.layout-single-column {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    /* Layout region styling */
    .layout-region {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
    }

    /* Responsive design */
    @media (max-width: 1024px) {
      &.layout-three-column {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      &.layout-two-column,
      &.layout-three-column {
        grid-template-columns: 1fr;
      }
    }
  `;
});
