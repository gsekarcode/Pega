import { Grid, Flex, FieldGroup, withConfiguration } from '@pega/cosmos-react-core';


import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
import DetailsRender from './DetailsRender';

import StyledDevDXExtensionsForm1Wrapper from './styles';

// interface for props
interface DevDXExtensionsForm1Props extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
  showLabel: boolean;
  leftColWidth?: string;
  rightColWidth?: string;
  children: any;
}

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function DevDXExtensionsForm1(props: DevDXExtensionsForm1Props) {

  const { children = [], label, showLabel, getPConnect, readOnly, displayMode } = props;
  const propsToUse = { label, showLabel, ...getPConnect().getInheritedProps() };

  // determine column widths from props or inherited props (defaults 25% / 75%)
  const inherited = (getPConnect().getInheritedProps() || {}) as any;
  const rawLeft = (props as any).leftColWidth ?? inherited.leftColWidth ?? '25%';
  const rawRight = (props as any).rightColWidth ?? inherited.rightColWidth ?? '75%';
  const normalizeWidth = (w: string) => {
    const s = String(w ?? '').trim();
    if (/^\d+$/.test(s)) return `${s}%`;
    if (/^\d+%$/.test(s)) return s;
    return s || '25%';
  };
  const left = normalizeWidth(rawLeft);
  const right = normalizeWidth(rawRight);


  if (readOnly && readOnly === true && displayMode && displayMode === 'DISPLAY_ONLY') {
    // use two fixed columns with configured widths for display-only mode
    const gridContainer = { colGap: 0, 'margin-line-start': 0 } as any;
    gridContainer.cols = `${left} ${right}`;

    return (
      <StyledDevDXExtensionsForm1Wrapper>
        <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
          <Grid container={gridContainer} data-testid="column-count-2">
            {children.map((child: any, i: number) => (
              <Flex
                // @ts-ignore
                container={{ direction: 'column', alignItems: 'normal', colGap: 1, rowGap: 1.5 }}
                key={`r-${i + 1}`}
              >
                <DetailsRender child={child} />
              </Flex>
            ))}
          </Grid>
        </FieldGroup>
      </StyledDevDXExtensionsForm1Wrapper>
    );
  }
  return (
    <StyledDevDXExtensionsForm1Wrapper>
    <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
  <Grid container={{
    // fixed two-column layout using configured widths
    cols: `${left} ${right}`,
    gap: 2
      }}>
            {children}
      </Grid>
    </FieldGroup>
    </StyledDevDXExtensionsForm1Wrapper>
  );


}

export default withConfiguration(DevDXExtensionsForm1);
