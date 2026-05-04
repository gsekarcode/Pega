import { useState, useEffect, useRef } from 'react';
import { withConfiguration, Button } from '@pega/cosmos-react-core';

import './create-nonce';
import {
  StyledWrapper,
  StyledHeader,
  StyledHeading,
  StyledDescription,
  StyledLoadingBar,
  StyledLoadingLabel,
  StyledCaseCard,
  StyledCaseCardHeader,
  StyledSuccessIcon,
  StyledCaseCardTitle,
  StyledCaseID,
  StyledActionBar,
  StyledError
} from './styles';

interface CaseCreateProps {
  heading?: string;
  description?: string;
  /** pyClassName of the case type to create */
  classFilter: string;
  labelCreate?: string;
  /** View to open after creation (default: pyDetails) */
  viewName?: string;
  /** Container to open the case in (default: modal) */
  containerName?: string;
  autoCreate?: boolean | string;
}

type Stage = 'idle' | 'creating' | 'launched' | 'error';

interface LaunchedCase {
  caseID: string;
  assignmentID: string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

function DevDXExtensionsCaseCreate(props: CaseCreateProps) {
  const {
    heading = 'Create case',
    description = '',
    classFilter,
    labelCreate = 'Create case',
    viewName = 'pyDetails',
    containerName = 'modal'
  } = props;

  const autoCreate = coerceBool(props.autoCreate, false);
  const hasAutoCreated = useRef(false);

  const [stage, setStage] = useState<Stage>('idle');
  const [launchedCase, setLaunchedCase] = useState<LaunchedCase | null>(null);
  const [error, setError] = useState('');

  const launchCase = (caseID: string, assignmentID: string) => {
    const PCore = (window as any).PCore;
    if (assignmentID) {
      PCore.getMashupApi().openAssignment(assignmentID, containerName, { viewName });
    } else {
      PCore.getMashupApi().openCase(caseID, containerName, { viewName });
    }
  };

  const createCase = async () => {
    if (!classFilter) {
      setError('No case type configured.');
      setStage('error');
      return;
    }

    setStage('creating');
    setError('');

    const PCore = (window as any).PCore;

    try {
      const response = await PCore.getRestClient().invokeRestApi('cases', {
        reqPayload: {
          caseTypeID: classFilter,
          processID: 'pyStartCase',
          content: {}
        }
      });

      const data = response?.data ?? response;
      const caseID: string = data?.ID ?? data?.caseInfo?.ID ?? '';
      const rawAssignments: any[] = data?.data?.caseInfo?.assignments ?? data?.caseInfo?.assignments ?? [];
      const raw = rawAssignments[0];
      const assignmentID: string = raw?.ID ?? raw?.id ?? '';

      setLaunchedCase({ caseID, assignmentID });
      setStage('launched');

      launchCase(caseID, assignmentID);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create case.');
      setStage('error');
    }
  };

  useEffect(() => {
    if (autoCreate && !hasAutoCreated.current) {
      hasAutoCreated.current = true;
      createCase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setStage('idle');
    setLaunchedCase(null);
    setError('');
  };

  return (
    <StyledWrapper>
      {(heading || description) && (
        <StyledHeader>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          {description && <StyledDescription>{description}</StyledDescription>}
        </StyledHeader>
      )}

      {stage === 'creating' && (
        <>
          <StyledLoadingBar />
          <StyledLoadingLabel>Creating case…</StyledLoadingLabel>
        </>
      )}

      {stage === 'error' && (
        <>
          <StyledError>{error || 'An unexpected error occurred.'}</StyledError>
          <Button variant='secondary' onClick={reset}>Try again</Button>
        </>
      )}

      {stage === 'idle' && (
        <Button variant='primary' onClick={createCase} disabled={!classFilter}>
          {labelCreate}
        </Button>
      )}

      {stage === 'launched' && launchedCase && (
        <>
          <StyledCaseCard>
            <StyledCaseCardHeader>
              <StyledSuccessIcon>✓</StyledSuccessIcon>
              <StyledCaseCardTitle>Case created</StyledCaseCardTitle>
            </StyledCaseCardHeader>
            {launchedCase.caseID && (
              <StyledCaseID>{launchedCase.caseID}</StyledCaseID>
            )}
          </StyledCaseCard>

          <StyledActionBar>
            <Button variant='secondary' onClick={reset}>Create another</Button>
          </StyledActionBar>
        </>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsCaseCreate);
export { DevDXExtensionsCaseCreate };
