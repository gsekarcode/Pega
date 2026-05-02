// @ts-nocheck
import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsNotificationBell } from './index';

const meta: Meta<typeof DevDXExtensionsNotificationBell> = {
  title: 'Widgets/Notification Bell',
  component: DevDXExtensionsNotificationBell,
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    getPConnect:          { table: { disable: true } },
    notificationDataPage: { control: 'text' },
    placement:            { control: 'select', options: ['bottom-end', 'bottom-start', 'bottom'] }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsNotificationBell>;

// ── Helpers ──────────────────────────────────────────────────────────────────

const makePConnect = (contextName = 'app/primary') => () => ({
  getContextName:   () => contextName,
  getInheritedProps: () => ({})
});

const mockPCore = (notifications: Array<{ message: string; date: string }>) => ({
  getDataPageUtils: () => ({
    getPageDataAsync: () =>
      Promise.resolve({
        count:     notifications.length,
        pxResults: notifications
      })
  }),
  getEnvironmentInfo: () => ({
    getOperatorIdentifier: () => 'testuser@example.com'
  })
});

// Decorator that injects window.PCore before the story renders
const withMockPCore =
  (notifications: Array<{ message: string; date: string }>) =>
  (Story: any) => {
    useEffect(() => {
      (window as any).PCore = mockPCore(notifications);
      return () => { delete (window as any).PCore; };
    }, []);
    return <Story />;
  };

// ── Stories ──────────────────────────────────────────────────────────────────

export const WithNotifications: Story = {
  name: 'With notifications (3 unread)',
  decorators: [
    withMockPCore([
      { message: 'Case C-101 assigned to you',   date: '2026-05-02' },
      { message: 'Approval pending on C-98',      date: '2026-05-01' },
      { message: 'SLA breach risk on C-95',       date: '2026-05-01' }
    ])
  ],
  args: {
    notificationDataPage: 'D_Notification',
    placement:            'bottom-end',
    getPConnect:          makePConnect()
  }
};

export const NoNotifications: Story = {
  name: 'No notifications',
  decorators: [withMockPCore([])],
  args: {
    notificationDataPage: 'D_Notification',
    placement:            'bottom-end',
    getPConnect:          makePConnect()
  }
};

export const ManyNotifications: Story = {
  name: 'Many notifications (badge caps at 99+)',
  decorators: [
    withMockPCore(
      Array.from({ length: 105 }, (_, i) => ({
        message: `Notification ${i + 1} — action required`,
        date:    '2026-05-02'
      }))
    )
  ],
  args: {
    notificationDataPage: 'D_Notification',
    placement:            'bottom-end',
    getPConnect:          makePConnect()
  }
};

export const PopoverBottomLeft: Story = {
  name: 'Popover placement — bottom left',
  decorators: [
    withMockPCore([
      { message: 'Case C-101 assigned to you', date: '2026-05-02' },
      { message: 'Approval pending on C-98',   date: '2026-05-01' }
    ])
  ],
  args: {
    notificationDataPage: 'D_Notification',
    placement:            'bottom-start',
    getPConnect:          makePConnect()
  }
};

export const OnDarkBackground: Story = {
  name: 'On dark background (as used in Side Nav)',
  decorators: [
    withMockPCore([
      { message: 'Case C-101 assigned to you', date: '2026-05-02' },
      { message: 'Approval pending on C-98',   date: '2026-05-01' }
    ]),
    (Story: any) => (
      <div style={{ background: '#003366', padding: '0.5rem 0.75rem', borderRadius: '4px' }}>
        <Story />
      </div>
    )
  ],
  args: {
    notificationDataPage: 'D_Notification',
    placement:            'bottom-end',
    getPConnect:          makePConnect()
  }
};
