import { useEffect, useRef } from 'react';
import { withConfiguration, Button } from '@pega/cosmos-react-core';

import './create-nonce';
import {
  StyledWrapper,
  StyledHeader,
  StyledHeading,
  StyledDescription
} from './styles';

interface CaseCreateProps {
  getPConnect: any;
  heading?: string;
  description?: string;
  /** pyClassName of the case type to create */
  classFilter: string;
  labelCreate?: string;
  autoCreate?: boolean | string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

function DevDXExtensionsCaseCreate(props: CaseCreateProps) {
  const {
    getPConnect,
    heading = 'Create case',
    description = '',
    classFilter,
    labelCreate = 'Create case'
  } = props;

  const autoCreate = coerceBool(props.autoCreate, false);
  const pConn = getPConnect();
  const hasAutoCreated = useRef(false);

  const createCase = () => {
    pConn.getActionsApi().createWork(classFilter, {
      flowType: 'pyStartCase',
      containerName: 'primary',
      openCaseViewAfterCreate: true
    });
  };

  useEffect(() => {
    if (autoCreate && !hasAutoCreated.current) {
      hasAutoCreated.current = true;
      createCase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper>
      {(heading || description) && (
        <StyledHeader>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          {description && <StyledDescription>{description}</StyledDescription>}
        </StyledHeader>
      )}
      <Button variant='primary' onClick={createCase} disabled={!classFilter}>
        {labelCreate}
      </Button>
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsCaseCreate);
export { DevDXExtensionsCaseCreate };
