import { useState, useEffect, useCallback } from 'react';
import { withConfiguration, Button } from '@pega/cosmos-react-core';

import './create-nonce';
import {
  StyledHost,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyMessage,
  StyledActivePanel,
  StyledPanelHeader,
  StyledPanelTitle,
  StyledStatusBadge,
  StyledMetaGrid,
  StyledMetaLabel,
  StyledMetaValue,
  StyledAssignmentBox,
  StyledAssignmentLabel,
  StyledAssignmentName,
  StyledActionRow,
  StyledDivider
} from './styles';

interface WorkareaState {
  activeContext: string;
  caseID: string;
  status: string;
  assignmentName: string;
  urgency: string;
}

interface WorkareaHostProps {
  getPConnect: any;
  emptyStateMessage?: string;
  showCaseDetails?: boolean | string;
  containerName?: string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean) => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

const InboxIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
    <polyline points='22 12 16 12 14 15 10 15 8 12 2 12' />
    <path d='M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' />
  </svg>
);

function DevDXExtensionsWorkareaHost(props: WorkareaHostProps) {
  const {
    getPConnect,
    emptyStateMessage = 'No active work item. Create or open a case to get started.',
    containerName = 'rightpanel'
  } = props;

  const showCaseDetails = coerceBool(props.showCaseDetails, true);

  const [workareaState, setWorkareaState] = useState<WorkareaState | null>(null);

  const refreshContainer = useCallback((target: string) => {
    const PCore = (window as any).PCore;
    if (!PCore?.getContainerUtils) return;

    let items = PCore.getContainerUtils().getContainerItems(target);

    if (!items || Object.keys(items).length === 0) {
      const storeState = PCore.getStore?.()?.getState?.();
      items = storeState?.containers?.[target]?.items ?? null;
    }

    if (!items || Object.keys(items).length === 0) {
      setWorkareaState(null);
      return;
    }

    const [itemKey, firstItem] = Object.entries(items)[0] as [string, any];
    if (!firstItem) {
      setWorkareaState(null);
      return;
    }

    const pick = (...keys: string[]) => {
      for (const k of keys) {
        const v = firstItem[k];
        if (v !== null && v !== undefined && v !== '') return v;
      }
      return '';
    };

    setWorkareaState({
      activeContext:  itemKey ?? target,
      caseID:         pick('ID', 'caseID', 'caseId', 'pzInsKey', 'key', 'caseInstanceKey'),
      status:         pick('status', 'pyStatusWork', 'caseStatus', 'pyStatus', 'statusWork'),
      assignmentName: pick('name', 'assignmentName', 'pyLabel', 'currentAssignmentName', 'stepName', 'processName', 'flowName', 'pxFlowName'),
      urgency:        String(pick('urgency', 'pyUrgency', 'slaUrgency', 'pxUrgencyWork'))
    });
  }, []);

  useEffect(() => {
    const PCore = (window as any).PCore;
    if (!PCore) return;

    const rootContainer = PCore.getContainerUtils?.().getRootContainerName?.() ?? 'app';
    const target = `${rootContainer}/${containerName}`;

    // Initialize the container using the pConnect container manager
    try {
      const containerManager = getPConnect().getContainerManager();
      containerManager.initializeContainers({
        name: containerName,  // e.g. 'rightpanel' → creates 'app/rightpanel'
        type: 'single'
      });
    } catch {
      // Safe to ignore — container may already be initialized
    }

    const handler = () => refreshContainer(target);

    if (!PCore?.getPubSubUtils || !PCore?.getEvents) {
      refreshContainer(target);
      return;
    }

    const caseEvents = PCore.getEvents().getCaseEvent();
    const pubSub = PCore.getPubSubUtils();
    const id = `container-host-DevDX-${containerName}`;

    pubSub.subscribe(caseEvents.CASE_CREATED,                handler, `${id}-case-created`);
    pubSub.subscribe(caseEvents.CASE_OPENED,                 handler, `${id}-case-opened`);
    pubSub.subscribe(caseEvents.ASSIGNMENT_OPENED,           handler, `${id}-assignment-opened`);
    pubSub.subscribe(caseEvents.ASSIGNMENT_SUBMISSION,       handler, `${id}-assignment-submitted`);
    pubSub.subscribe(caseEvents.CASE_CLOSED,                 handler, `${id}-case-closed`);
    pubSub.subscribe(caseEvents.CREATE_STAGE_DONE,           handler, `${id}-create-done`);
    pubSub.subscribe(caseEvents.CURRENT_ASSIGNMENT_UPDATED,  handler, `${id}-assignment-updated`);

    refreshContainer(target);

    return () => {
      pubSub.unsubscribe(caseEvents.CASE_CREATED,               `${id}-case-created`);
      pubSub.unsubscribe(caseEvents.CASE_OPENED,                `${id}-case-opened`);
      pubSub.unsubscribe(caseEvents.ASSIGNMENT_OPENED,          `${id}-assignment-opened`);
      pubSub.unsubscribe(caseEvents.ASSIGNMENT_SUBMISSION,      `${id}-assignment-submitted`);
      pubSub.unsubscribe(caseEvents.CASE_CLOSED,                `${id}-case-closed`);
      pubSub.unsubscribe(caseEvents.CREATE_STAGE_DONE,          `${id}-create-done`);
      pubSub.unsubscribe(caseEvents.CURRENT_ASSIGNMENT_UPDATED, `${id}-assignment-updated`);
    };
  }, [containerName, getPConnect, refreshContainer]);

  const handleClose = () => {
    const PCore = (window as any).PCore;
    if (!PCore?.getContainerUtils || !workareaState) return;
    PCore.getContainerUtils().closeContainerItem(workareaState.activeContext, { skipDirtyCheck: false });
    setWorkareaState(null);
  };

  if (!workareaState) {
    return (
      <StyledHost>
        <StyledEmptyState>
          <StyledEmptyIcon><InboxIcon /></StyledEmptyIcon>
          <StyledEmptyMessage>{emptyStateMessage}</StyledEmptyMessage>
        </StyledEmptyState>
      </StyledHost>
    );
  }

  return (
    <StyledHost>
      <StyledActivePanel>
        <StyledPanelHeader>
          <StyledPanelTitle>{workareaState.caseID || 'Active Case'}</StyledPanelTitle>
          {workareaState.status && (
            <StyledStatusBadge status={workareaState.status}>{workareaState.status}</StyledStatusBadge>
          )}
        </StyledPanelHeader>

        {showCaseDetails && workareaState.caseID && (
          <StyledMetaGrid>
            <StyledMetaLabel>Case ID</StyledMetaLabel>
            <StyledMetaValue>{workareaState.caseID}</StyledMetaValue>
            {workareaState.urgency && (
              <>
                <StyledMetaLabel>Urgency</StyledMetaLabel>
                <StyledMetaValue>{workareaState.urgency}</StyledMetaValue>
              </>
            )}
          </StyledMetaGrid>
        )}

        {workareaState.assignmentName && (
          <>
            <StyledDivider />
            <StyledAssignmentBox>
              <StyledAssignmentLabel>Current assignment</StyledAssignmentLabel>
              <StyledAssignmentName>{workareaState.assignmentName}</StyledAssignmentName>
            </StyledAssignmentBox>
          </>
        )}

        <StyledActionRow>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
        </StyledActionRow>
      </StyledActivePanel>
    </StyledHost>
  );
}

export default withConfiguration(DevDXExtensionsWorkareaHost);
export { DevDXExtensionsWorkareaHost };
