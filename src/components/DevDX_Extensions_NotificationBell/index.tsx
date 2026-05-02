import { useState, useEffect } from 'react';
import { withConfiguration, Popover, useOuterEvent, useElement } from '@pega/cosmos-react-core';

import './create-nonce';
import {
  StyledWrapper,
  StyledBellButton,
  StyledBadge,
  StyledPopoverHeading,
  StyledNotifList,
  StyledNotifItem,
  StyledNotifDate,
  StyledEmpty
} from './styles';

interface Notification {
  message: string;
  date?: string;
}

interface NotificationBellProps {
  getPConnect: any;
  notificationDataPage: string;
  placement?: string;
}

const BellIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
    <path d='M13.73 21a2 2 0 0 1-3.46 0' />
  </svg>
);

function DevDXExtensionsNotificationBell(props: NotificationBellProps) {
  const { getPConnect, notificationDataPage, placement = 'bottom-end' } = props;

  const [notifCount, setNotifCount] = useState<number>(0);
  const [notifList, setNotifList] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bellEl, setBellEl] = useElement(null);
  const [popoverEl, setPopoverEl] = useElement(null);

  useEffect(() => {
    if (!notificationDataPage) return;

    const PCore = (window as any).PCore;
    if (!PCore?.getDataPageUtils) return;

    const operatorID = PCore.getEnvironmentInfo?.()?.getOperatorIdentifier?.() ?? '';

    PCore.getDataPageUtils()
      .getPageDataAsync(notificationDataPage, getPConnect().getContextName(), { pyOperatorID: operatorID })
      .then((page: any) => {
        setNotifCount(Number(page?.count ?? page?.Count ?? 0));
        const results: Notification[] = (page?.pxResults ?? page?.notifications ?? []).map((n: any) => ({
          message: n.message ?? n.Message ?? n.pyLabel ?? '',
          date: n.date ?? n.Date ?? n.pyUpdateDateTime ?? ''
        }));
        setNotifList(results);
      })
      .catch(() => {/* silently ignore */});
  }, [notificationDataPage, getPConnect]);

  const handleBellClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBellEl(e.currentTarget);
    setIsOpen(prev => !prev);
  };

  const closePopover = () => setIsOpen(false);

  useOuterEvent('mousedown', [bellEl, popoverEl], closePopover);

  return (
    <StyledWrapper>
      <StyledBellButton
        type='button'
        aria-label={`Notifications${notifCount > 0 ? `, ${notifCount} unread` : ''}`}
        aria-haspopup='true'
        aria-expanded={isOpen}
        onClick={handleBellClick}
      >
        <BellIcon />
        {notifCount > 0 && (
          <StyledBadge aria-hidden='true'>{notifCount > 99 ? '99+' : notifCount}</StyledBadge>
        )}
      </StyledBellButton>

      {isOpen && (
        <Popover
          ref={setPopoverEl}
          target={bellEl}
          placement={placement as any}
          strategy='fixed'
        >
          <StyledPopoverHeading>Notifications</StyledPopoverHeading>
          {notifList.length === 0 ? (
            <StyledEmpty>No notifications</StyledEmpty>
          ) : (
            <StyledNotifList>
              {notifList.map((n, i) => (
                <StyledNotifItem key={i}>
                  <div>{n.message}</div>
                  {n.date && <StyledNotifDate>{n.date}</StyledNotifDate>}
                </StyledNotifItem>
              ))}
            </StyledNotifList>
          )}
        </Popover>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsNotificationBell);
export { DevDXExtensionsNotificationBell };
