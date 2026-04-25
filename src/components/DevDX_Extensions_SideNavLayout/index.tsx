import { useState, useEffect, useCallback } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';

import './create-nonce';
import { CASE_REQUEST_EVENT } from '../DevDX_Extensions_CaseLauncher/index';
import {
  StyledWrapper,
  StyledLeftPanel,
  StyledNavItem,
  StyledRightPanel,
  StyledEmptyState,
  StyledBackButton
} from './styles';

interface SideNavLayoutProps {
  getPConnect: any;
  navLabel1?: string;
  navLabel2?: string;
  navLabel3?: string;
  navLabel4?: string;
  navLabel5?: string;
  // children[0..4] are the rendered contents for Slot1..Slot5
  children?: any;
}

function DevDXExtensionsSideNavLayout(props: SideNavLayoutProps) {
  const {
    getPConnect,
    navLabel1,
    navLabel2,
    navLabel3,
    navLabel4,
    navLabel5,
    children = []
  } = props;

  const inherited = getPConnect().getInheritedProps() || {};

  const allSlots = [
    { label: navLabel1 ?? inherited.navLabel1, content: children[0] },
    { label: navLabel2 ?? inherited.navLabel2, content: children[1] },
    { label: navLabel3 ?? inherited.navLabel3, content: children[2] },
    { label: navLabel4 ?? inherited.navLabel4, content: children[3] },
    { label: navLabel5 ?? inherited.navLabel5, content: children[4] }
  ].filter(slot => typeof slot.label === 'string' && slot.label.trim() !== '');

  const [selectedIndex, setSelectedIndex] = useState(0);

  // When non-null, the right panel shows this case creation view instead of the slot
  const [caseView, setCaseView] = useState<any>(null);

  /**
   * Receives the PubSub event from CaseLauncher.
   * Uses PCore.createPConnect() to instantiate the case creation form inline —
   * the same pattern DynamicHierarchicalForm uses for embedded views.
   * Falls back to opening in the primary container if PCore is unavailable.
   */
  const handleCaseRequest = useCallback(
    ({ className, flowType }: { className: string; flowType: string }) => {
      const PCore = (window as any).PCore;
      const pConn = getPConnect();

      if (!PCore?.getViewResources || !PCore?.createPConnect) {
        // PCore not available (e.g. Storybook without mock) — fall back
        pConn.getActionsApi().createWork(className, {
          flowType,
          containerName: 'primary',
          openCaseViewAfterCreate: true
        });
        return;
      }

      // Fetch the case-creation view metadata. fetchViewResources may be sync
      // or return a Promise depending on whether Pega has already cached the view.
      const metaOrPromise = PCore.getViewResources().fetchViewResources(
        'pyStartCase',
        pConn,
        className
      );

      Promise.resolve(metaOrPromise).then((meta: any) => {
        // Build a scoped PConnect for the case creation form so it renders
        // inside this component's context (not the primary container).
        const c11nEnv = PCore.createPConnect({
          meta,
          options: {
            contextName: pConn.getContextName(),
            context: pConn.getContextName(),
            pageReference: 'newWork'
          }
        });
        setCaseView(c11nEnv.getPConnect().getComponent());
      });
    },
    [getPConnect]
  );

  // Subscribe on mount; unsubscribe on unmount
  useEffect(() => {
    const SUB_KEY = 'G_SIDENAV_RIGHT_PANEL';
    const PCore = (window as any).PCore;
    PCore?.getPubSubUtils?.()?.subscribe(CASE_REQUEST_EVENT, handleCaseRequest, SUB_KEY);
    return () => {
      PCore?.getPubSubUtils?.()?.unsubscribe(CASE_REQUEST_EVENT, SUB_KEY);
    };
  }, [handleCaseRequest]);

  // Clicking a nav item clears any active case view and shows the slot content
  const handleNavClick = (index: number) => {
    setCaseView(null);
    setSelectedIndex(index);
  };

  const activeIndex = Math.min(selectedIndex, Math.max(allSlots.length - 1, 0));
  const activeSlot = allSlots[activeIndex];

  // Determine what to render in the right panel
  const rightContent = caseView ?? activeSlot?.content ?? (
    <StyledEmptyState>No content configured for this navigation item.</StyledEmptyState>
  );

  return (
    <StyledWrapper>
      {/* ── Left navigation panel ── */}
      <StyledLeftPanel role='navigation' aria-label='Page navigation'>
        {allSlots.map((slot, i) => (
          <StyledNavItem
            key={slot.label}
            type='button'
            data-active={i === activeIndex && !caseView ? 'true' : 'false'}
            aria-current={i === activeIndex && !caseView ? 'page' : undefined}
            onClick={() => handleNavClick(i)}
          >
            {slot.label}
          </StyledNavItem>
        ))}
      </StyledLeftPanel>

      {/* ── Right content panel ── */}
      <StyledRightPanel role='main'>
        {caseView && (
          <StyledBackButton
            type='button'
            onClick={() => setCaseView(null)}
            aria-label='Close case and return to previous view'
          >
            ← Back
          </StyledBackButton>
        )}
        {rightContent}
      </StyledRightPanel>
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsSideNavLayout);
export { DevDXExtensionsSideNavLayout };
