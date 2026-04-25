// individual style, comment out above, and uncomment here and add styles
import styled, { css } from 'styled-components';

export default styled.div(() => {
  return css`
    margin: 0px 0;
  /* light blue background for the wrapper, set template text color to red, and padding */
  background: #add8e6;
  color: red;
  padding: 30px;
  box-sizing: border-box;
  /* curved border */
  border-radius: 18px;
    /* label styling inside the wrapper */
    label {
      font-size: 100px !important;
      line-height: 1.0;
      font-weight: 600;
    }
    /* Target FieldGroup header implementations used by the SDK (covers variations) */
    #field-group-header,
    .fieldGroupHeader,
    .field-group-header,
    .fieldMargin,
    .field-margin,
    .field-group__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 15px 20px;
      border-radius: 8px 8px 0 0;
    }
    #field-group-header b,
    .fieldGroupHeader b,
    .field-group-header b,
    .fieldMargin b,
    .field-margin b,
    .field-group__header b {
      font-size: 100px !important;
      line-height: 1.0 !important;
      font-weight: 600 !important;
      color: white;
    }
  `;
});
