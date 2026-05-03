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
  StyledCaseDetails,
  StyledDetailRow,
  StyledDetailLabel,
  StyledDetailValue,
  StyledUrgencyBadge,
  StyledAssignmentSection,
  StyledAssignmentLabel,
  StyledAssignmentName,
  StyledActionBar,
  StyledError
} from './styles';

interface AssignmentInfo {
  id: string;
  name: string;
  urgency: number;
  type: string;
}

interface CaseInfo {
  caseID: string;
  status: string;
  caseTypeName: string;
  firstAssignment: AssignmentInfo | null;
}

type Stage = 'idle' | 'creating' | 'ready' | 'error';

interface CaseInitiatorProps {
  getPConnect: any;
  heading?: string;
  description?: string;
  classFilter: string;
  labelCreate?: string;
  containerName?: string;
  autoCreate?: boolean | string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean) => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

function DevDXExtensionsCaseInitiator(props: CaseInitiatorProps) {
  const {
    getPConnect,
    heading = 'Create a case',
    description = '',
    classFilter,
    labelCreate = 'Create & Start',
    containerName = 'primary'
  } = props;

  const autoCreate = coerceBool(props.autoCreate, false);

  const pConn = getPConnect();
  const hasAutoCreated = useRef(false);

  const [stage, setStage] = useState<Stage>('idle');
  const [caseInfo, setCaseInfo] = useState<CaseInfo | null>(null);
  const [error, setError] = useState('');

  const createCase = async () => {
    if (!classFilter) {
      setError('No case type configured.');
      setStage('error');
      return;
    }

    setStage('creating');
    setError('');

    const PCore = (window as any).PCore;

    // ── Try DX REST API first ─────────────────────────────────────────────────
    if (PCore?.getRestClient) {
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
        const status: string = data?.data?.caseInfo?.status ?? data?.caseInfo?.status ?? 'New';
        const caseTypeName: string = data?.data?.caseInfo?.caseTypeName ?? classFilter;
        const rawAssignments: any[] = data?.data?.caseInfo?.assignments ?? data?.caseInfo?.assignments ?? [];

        const raw = rawAssignments[0];
        const firstAssignment: AssignmentInfo | null = raw
          ? {
              id: raw.ID ?? raw.id ?? '',
              name: raw.name ?? raw.processName ?? 'Assignment',
              urgency: Number(raw.urgency ?? 10),
              type: raw.type ?? 'Worklist'
            }
          : null;

        setCaseInfo({ caseID, status, caseTypeName, firstAssignment });
        setStage('ready');
        return;
      } catch {
        // Fall through to SDK fallback
      }
    }

    // ── Fallback: SDK createWork ──────────────────────────────────────────────
    // createWork handles navigation itself — we reflect that in UI state
    try {
      pConn.getActionsApi().createWork(classFilter, {
        flowType: 'pyStartCase',
        containerName,
        openCaseViewAfterCreate: true
      });
      // SDK handles rendering; show a minimal "launched" state
      setCaseInfo({
        caseID: '',
        status: 'Launched',
        caseTypeName: classFilter,
        firstAssignment: null
      });
      setStage('ready');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create case.');
      setStage('error');
    }
  };

  const openAssignment = () => {
    if (!caseInfo) return;
    const PCore = (window as any).PCore;

    if (caseInfo.firstAssignment?.id) {
      // Open the specific assignment
      if (PCore?.getMashupApi?.().openAssignment) {
        PCore.getMashupApi().openAssignment(caseInfo.firstAssignment.id, containerName, {});
      } else {
        pConn.getActionsApi().openWork(caseInfo.caseID, { containerName });
      }
    } else if (caseInfo.caseID) {
      pConn.getActionsApi().openWork(caseInfo.caseID, { containerName });
    }
  };

  const reset = () => {
    setStage('idle');
    setCaseInfo(null);
    setError('');
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
      {/* ── Header ── */}
      {(heading || description) && (
        <StyledHeader>
          {heading && <StyledHeading>{heading}</StyledHeading>}
          {description && <StyledDescription>{description}</StyledDescription>}
        </StyledHeader>
      )}

      {/* ── Creating ── */}
      {stage === 'creating' && (
        <>
          <StyledLoadingBar />
          <StyledLoadingLabel>Creating case…</StyledLoadingLabel>
        </>
      )}

      {/* ── Error ── */}
      {stage === 'error' && (
        <>
          <StyledError>{error || 'An unexpected error occurred.'}</StyledError>
          <Button variant='secondary' onClick={reset}>Try again</Button>
        </>
      )}

      {/* ── Idle: show create button ── */}
      {stage === 'idle' && (
        <Button variant='primary' onClick={createCase} disabled={!classFilter}>
          {labelCreate}
        </Button>
      )}

      {/* ── Ready: show case + assignment summary ── */}
      {stage === 'ready' && caseInfo && (
        <>
          <StyledCaseCard>
            <StyledCaseCardHeader>
              <StyledSuccessIcon>✓</StyledSuccessIcon>
              <StyledCaseCardTitle>Case created successfully</StyledCaseCardTitle>
            </StyledCaseCardHeader>

            <StyledCaseDetails>
              {caseInfo.caseID && (
                <StyledDetailRow>
                  <StyledDetailLabel>Case ID</StyledDetailLabel>
                  <StyledDetailValue>{caseInfo.caseID}</StyledDetailValue>
                </StyledDetailRow>
              )}
              <StyledDetailRow>
                <StyledDetailLabel>Status</StyledDetailLabel>
                <StyledDetailValue>{caseInfo.status}</StyledDetailValue>
              </StyledDetailRow>
              {caseInfo.firstAssignment && (
                <StyledDetailRow>
                  <StyledDetailLabel>Urgency</StyledDetailLabel>
                  <StyledUrgencyBadge urgency={caseInfo.firstAssignment.urgency}>
                    {caseInfo.firstAssignment.urgency}
                  </StyledUrgencyBadge>
                </StyledDetailRow>
              )}
            </StyledCaseDetails>

            {caseInfo.firstAssignment && (
              <StyledAssignmentSection>
                <StyledAssignmentLabel>First assignment</StyledAssignmentLabel>
                <StyledAssignmentName>{caseInfo.firstAssignment.name}</StyledAssignmentName>
              </StyledAssignmentSection>
            )}
          </StyledCaseCard>

          <StyledActionBar>
            <Button variant='secondary' onClick={reset}>
              Create another
            </Button>
            {(caseInfo.caseID || caseInfo.firstAssignment) && (
              <Button variant='primary' onClick={openAssignment}>
                Open assignment
              </Button>
            )}
          </StyledActionBar>
        </>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsCaseInitiator);
export { DevDXExtensionsCaseInitiator };
