import { useState } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';

import './create-nonce';
import {
  StyledWrapper,
  StyledLeftPanel,
  StyledNavItem,
  StyledRightPanel,
  StyledEmptyState,
  StyledNavHeaderSlot
} from './styles';

interface SideNavLayoutProps {
  getPConnect: any;
  navLabel1?: string;
  navLabel2?: string;
  navLabel3?: string;
  navLabel4?: string;
  navLabel5?: string;
  navLabel6?: string;
  navLabel7?: string;
  defaultSlot?: string;
  children?: any;
}

function resolveDefaultIndex(defaultSlot: string | undefined, slots: Array<{ label: string }>) {
  if (!defaultSlot) return 0;
  const asNumber = Number(defaultSlot);
  if (!isNaN(asNumber) && asNumber >= 1) {
    return Math.min(asNumber - 1, slots.length - 1);
  }
  const idx = slots.findIndex(s => s.label?.toLowerCase() === defaultSlot.toLowerCase());
  return idx >= 0 ? idx : 0;
}

function DevDXExtensionsSideNavLayout(props: SideNavLayoutProps) {
  const {
    getPConnect,
    navLabel1,
    navLabel2,
    navLabel3,
    navLabel4,
    navLabel5,
    navLabel6,
    navLabel7,
    defaultSlot = '',
    children = []
  } = props;

  const inherited = getPConnect().getInheritedProps() || {};

  const allSlots = [
    { label: navLabel1 ?? inherited.navLabel1, content: children[0] },
    { label: navLabel2 ?? inherited.navLabel2, content: children[1] },
    { label: navLabel3 ?? inherited.navLabel3, content: children[2] },
    { label: navLabel4 ?? inherited.navLabel4, content: children[3] },
    { label: navLabel5 ?? inherited.navLabel5, content: children[4] },
    { label: navLabel6 ?? inherited.navLabel6, content: children[5] },
    { label: navLabel7 ?? inherited.navLabel7, content: children[6] }
  ].filter(slot => typeof slot.label === 'string' && slot.label.trim() !== '');

  // children[7] is the optional NavHeaderSlot widget
  const navHeaderWidget = children[7];

  const [selectedIndex, setSelectedIndex] = useState(() => resolveDefaultIndex(defaultSlot, allSlots));

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
        {navHeaderWidget && (
          <StyledNavHeaderSlot>{navHeaderWidget}</StyledNavHeaderSlot>
        )}

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
