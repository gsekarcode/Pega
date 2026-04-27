import { useState, useEffect, useCallback } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';

import './create-nonce';
import { CASE_REQUEST_EVENT } from '../DevDX_Extensions_CaseLauncher/index';
import {
  StyledWrapper,
  StyledLeftPanel,
  StyledNavItem,
  StyledRightPanel,
  StyledEmptyState
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

  const handleCaseRequest = useCallback(
    ({ className, flowType }: { className: string; flowType: string }) => {
      const pConn = getPConnect();
      // Open case creation in a modal so it doesn't replace the page
      pConn.getActionsApi().createWork(className, {
        flowType,
        containerName: 'modal',
        openCaseViewAfterCreate: true
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

  const handleNavClick = (index: number) => {
    setSelectedIndex(index);
  };

  const activeIndex = Math.min(selectedIndex, Math.max(allSlots.length - 1, 0));
  const activeSlot = allSlots[activeIndex];
  const rightContent = activeSlot?.content ?? (
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
            data-active={i === activeIndex ? 'true' : 'false'}
            aria-current={i === activeIndex ? 'page' : undefined}
            onClick={() => handleNavClick(i)}
          >
            {slot.label}
          </StyledNavItem>
        ))}
      </StyledLeftPanel>

      {/* ── Right content panel ── */}
      <StyledRightPanel role='main'>
        {rightContent}
      </StyledRightPanel>
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsSideNavLayout);
export { DevDXExtensionsSideNavLayout };
