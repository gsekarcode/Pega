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
    emptyStateMessage = 'No active work item. Create or open a case to get started.'
  } = props;

  const showCaseDetails = coerceBool(props.showCaseDetails, true);

  const [workareaState, setWorkareaState] = useState<WorkareaState | null>(null);

  const refreshWorkarea = useCallback(() => {
    const PCore = (window as any).PCore;
    if (!PCore?.getContainerUtils) return;

    const contextName = getPConnect().getContextName();

    // The workarea target lives under the primary container item context
    // e.g. if contextName = 'app/primary_1', workarea target = 'app/primary_1/workarea'
    const workareaTarget = `${contextName}/workarea`;

    const hasItems = PCore.getContainerUtils().areContainerItemsPresent(workareaTarget);
    if (!hasItems) {
      setWorkareaState(null);
      return;
    }

    const activeContainerItem = PCore.getContainerUtils().getActiveContainerItemName(workareaTarget);
    if (!activeContainerItem) {
      setWorkareaState(null);
      return;
    }

    // Workarea item holds no data itself — resolve the real data context
    const dataContext = PCore.getContainerUtils().getDataContextName(activeContainerItem)
      ?? PCore.getContainerUtils().getActiveContainerItemContext(workareaTarget);

    if (!dataContext) {
      setWorkareaState(null);
      return;
    }

    // Pull case and assignment data from the resolved data context
    const caseInfo       = PCore.getStoreValue?.('caseInfo',      '', dataContext) ?? {};
    const assignmentInfo = PCore.getStoreValue?.('assignmentInfo', '', dataContext) ?? {};

    setWorkareaState({
      activeContext: activeContainerItem,
      caseID:        caseInfo.ID ?? caseInfo.caseId ?? '',
      status:         caseInfo.status ?? caseInfo.pyStatusWork ?? '',
      assignmentName: assignmentInfo.name ?? assignmentInfo.pyLabel ?? caseInfo.currentAssignmentName ?? '',
      urgency:        String(assignmentInfo.urgency ?? caseInfo.urgency ?? '')
    });
  }, [getPConnect]);

  useEffect(() => {
    const PCore = (window as any).PCore;
    if (!PCore?.getPubSubUtils || !PCore?.getEvents) return;

    const caseEvents = PCore.getEvents().getCaseEvent();
    const pubSub = PCore.getPubSubUtils();
    const id = 'workarea-host-DevDX';

    const handler = () => refreshWorkarea();

    pubSub.subscribe(caseEvents.CASE_OPENED,              handler, `${id}-case-opened`);
    pubSub.subscribe(caseEvents.ASSIGNMENT_OPENED,        handler, `${id}-assignment-opened`);
    pubSub.subscribe(caseEvents.ASSIGNMENT_SUBMISSION,    handler, `${id}-assignment-submitted`);
    pubSub.subscribe(caseEvents.CASE_CLOSED,              handler, `${id}-case-closed`);
    pubSub.subscribe(caseEvents.CREATE_STAGE_DONE,        handler, `${id}-create-done`);
    pubSub.subscribe(caseEvents.CURRENT_ASSIGNMENT_UPDATED, handler, `${id}-assignment-updated`);

    // Check workarea immediately on mount
    refreshWorkarea();

    return () => {
      pubSub.unsubscribe(caseEvents.CASE_OPENED,               `${id}-case-opened`);
      pubSub.unsubscribe(caseEvents.ASSIGNMENT_OPENED,         `${id}-assignment-opened`);
      pubSub.unsubscribe(caseEvents.ASSIGNMENT_SUBMISSION,     `${id}-assignment-submitted`);
      pubSub.unsubscribe(caseEvents.CASE_CLOSED,               `${id}-case-closed`);
      pubSub.unsubscribe(caseEvents.CREATE_STAGE_DONE,         `${id}-create-done`);
      pubSub.unsubscribe(caseEvents.CURRENT_ASSIGNMENT_UPDATED, `${id}-assignment-updated`);
    };
  }, [refreshWorkarea]);

  const handleClose = () => {
    const PCore = (window as any).PCore;
    if (!PCore?.getContainerUtils || !workareaState) return;
    PCore.getContainerUtils().closeContainerItem(workareaState.activeContext, { skipDirtyCheck: false });
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
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </StyledActionRow>
      </StyledActivePanel>
    </StyledHost>
  );
}

export default withConfiguration(DevDXExtensionsWorkareaHost);
export { DevDXExtensionsWorkareaHost };
