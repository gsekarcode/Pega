import { withConfiguration, Grid, Flex, FieldGroup } from '@pega/cosmos-react-core';

import type { PConnProps } from './PConnProps';
import './create-nonce';
import StyledDevDXExtensionsTwoColumnFormWrapper from './styles';

interface TwoColumnFormProps extends PConnProps {
  label?: string;
  showLabel?: boolean;
  leftColWidth?: string;
  rightColWidth?: string;
  children?: any;
}

// Accepts "25", "25%", or any valid CSS width — normalizes to a CSS value
const normalizeWidth = (raw: string | undefined, fallback: string): string => {
  const s = String(raw ?? '').trim();
  if (!s) return fallback;
  if (/^\d+$/.test(s)) return `${s}%`;
  return s;
};

function DevDXExtensionsTwoColumnForm(props: TwoColumnFormProps) {
  const { getPConnect, label = '', showLabel = true, children = [] } = props;

  const inherited = (getPConnect().getInheritedProps() || {}) as any;
  const propsToUse = { label, showLabel, ...inherited };

  const leftWidth = normalizeWidth(
    (props as any).leftColWidth ?? inherited.leftColWidth,
    '50%'
  );
  const rightWidth = normalizeWidth(
    (props as any).rightColWidth ?? inherited.rightColWidth,
    '50%'
  );

  // children[0] = Region A (left), children[1] = Region B (right)
  const regionA = Array.isArray(children) ? children[0] : null;
  const regionB = Array.isArray(children) ? children[1] : null;

  return (
    <StyledDevDXExtensionsTwoColumnFormWrapper>
      <FieldGroup name={propsToUse.showLabel ? propsToUse.label : ''}>
        <Grid
          container={{
            cols: `${leftWidth} ${rightWidth}`,
            gap: 2
          }}
          data-testid='two-column-grid'
        >
          <Flex
            container={{ direction: 'column', gap: 1 }}
            data-testid='region-a'
          >
            {regionA}
          </Flex>
          <Flex
            container={{ direction: 'column', gap: 1 }}
            data-testid='region-b'
          >
            {regionB}
          </Flex>
        </Grid>
      </FieldGroup>
    </StyledDevDXExtensionsTwoColumnFormWrapper>
  );
}

export default withConfiguration(DevDXExtensionsTwoColumnForm);
