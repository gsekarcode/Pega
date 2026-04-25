import { withConfiguration } from '@pega/cosmos-react-core';

import type { PConnProps } from './PConnProps';
import './create-nonce';
import { StyledCard, StyledValue, StyledLabel } from './styles';

interface KPICardProps extends PConnProps {
  label?: string;
  value?: string;
  color?: string;
}

function DevDXExtensionsKPICard(props: KPICardProps) {
  const { getPConnect, label = '', value = '', color = '#2563eb' } = props;

  const inherited = getPConnect().getInheritedProps() || {};
  const resolvedLabel = label || inherited.label || '';
  const resolvedValue = value || inherited.value || '';
  const resolvedColor = color || inherited.color || '#2563eb';

  return (
    <StyledCard $color={resolvedColor} data-testid='kpi-card'>
      <StyledValue $color={resolvedColor} data-testid='kpi-value'>
        {resolvedValue}
      </StyledValue>
      <StyledLabel data-testid='kpi-label'>{resolvedLabel}</StyledLabel>
    </StyledCard>
  );
}

export default withConfiguration(DevDXExtensionsKPICard);
export { DevDXExtensionsKPICard };
