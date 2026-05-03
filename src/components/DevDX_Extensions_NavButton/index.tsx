import { withConfiguration, Button, FormField } from '@pega/cosmos-react-core';

import './create-nonce';
import { StyledWrapper } from './styles';

interface NavButtonProps {
  getPConnect: any;
  label?: string;
  buttonLabel?: string;
  className?: string;
  pageName?: string;
  variant?: 'primary' | 'secondary' | 'link';
  disabled?: boolean | string;
  readOnly?: boolean | string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean) => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

function DevDXExtensionsNavButton(props: NavButtonProps) {
  const {
    getPConnect,
    label = '',
    buttonLabel = 'Open',
    className = '',
    pageName = '',
    variant = 'primary'
  } = props;

  const isDisabled = coerceBool(props.disabled, false);
  const isReadOnly = coerceBool(props.readOnly, false);

  const pConn = getPConnect();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!pageName || !className) return;

    pConn.getActionsApi().openLocalAction(pageName, {
      target:        e.currentTarget,
      containerName: 'primary',
      type:          'Case',
      caseID:        className
    });
  };

  const button = (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled || isReadOnly || !pageName || !className}
    >
      {buttonLabel}
    </Button>
  );

  if (!label) {
    return <StyledWrapper>{button}</StyledWrapper>;
  }

  return (
    <FormField label={label}>
      <StyledWrapper>{button}</StyledWrapper>
    </FormField>
  );
}

export default withConfiguration(DevDXExtensionsNavButton);
export { DevDXExtensionsNavButton };
