// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsSideNavLayout } from './index';

const meta: Meta<typeof DevDXExtensionsSideNavLayout> = {
  title: 'Templates/Side Nav Layout',
  component: DevDXExtensionsSideNavLayout,
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    getPConnect:  { table: { disable: true } },
    defaultSlot:  { description: 'Slot label or 1-based number to open by default' }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsSideNavLayout>;

const makePConnect = () => () => ({ getInheritedProps: () => ({}) });

// ── Mock slot content ────────────────────────────────────────────────────────

const DashboardView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Dashboard</h3>
    <p style={{ color: '#6b7280', margin: 0 }}>Welcome back. Here is your activity summary.</p>
    <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
      ✅ 5 cases assigned to you
    </div>
    <div style={{ padding: '1rem', background: '#fefce8', borderRadius: '0.5rem', border: '1px solid #fef08a' }}>
      ⚠️ 2 cases pending approval
    </div>
  </div>
);

const CreateCaseView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Create Case</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Case Type</span>
        <select style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}>
          <option>Service Request</option>
          <option>Complaint</option>
          <option>Enquiry</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Description</span>
        <textarea
          rows={4}
          style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', resize: 'vertical' }}
          placeholder='Enter a brief description...'
        />
      </label>
      <button
        type='button'
        style={{ padding: '0.5rem 1.25rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', alignSelf: 'flex-start' }}
      >
        Create Case
      </button>
    </div>
  </div>
);

const SearchView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Search</h3>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type='search'
        placeholder='Search cases, customers...'
        style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', fontSize: '0.9375rem' }}
      />
      <button
        type='button'
        style={{ padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
      >
        Search
      </button>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
      <thead>
        <tr style={{ background: '#f3f4f6' }}>
          <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Case ID</th>
          <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Type</th>
          <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {['C-101', 'C-102', 'C-103'].map(id => (
          <tr key={id}>
            <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>{id}</td>
            <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>Service Request</td>
            <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #f3f4f6' }}>Open</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ReportsView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Reports</h3>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {[
        { label: 'Open Cases',           value: '142', color: '#2563eb' },
        { label: 'Resolved Today',       value: '38',  color: '#16a34a' },
        { label: 'Avg Resolution (hrs)', value: '4.2', color: '#9333ea' }
      ].map(stat => (
        <div
          key={stat.label}
          style={{ flex: '1 1 140px', padding: '1rem', border: `2px solid ${stat.color}`, borderRadius: '0.5rem', textAlign: 'center' }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
          <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const AdminView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Admin</h3>
    <p style={{ color: '#6b7280', margin: 0 }}>Manage users, roles, and system settings.</p>
  </div>
);

const AuditView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Audit Log</h3>
    <p style={{ color: '#6b7280', margin: 0 }}>View system activity and audit trail.</p>
  </div>
);

const HelpView = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Help</h3>
    <p style={{ color: '#6b7280', margin: 0 }}>Documentation, FAQs, and support contacts.</p>
  </div>
);

// ── Mock notification bell for NavHeaderSlot ─────────────────────────────────

const MockNotificationBell = ({ count = 3 }: { count?: number }) => {
  const [open, setOpen] = React.useState(false);
  const notifications = [
    { message: 'Case C-101 assigned to you',   date: '2026-05-02' },
    { message: 'Approval pending on C-98',      date: '2026-05-01' },
    { message: 'SLA breach risk on C-95',       date: '2026-05-01' }
  ].slice(0, count);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type='button'
        aria-label={`Notifications, ${count} unread`}
        onClick={() => setOpen(p => !p)}
        style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '0.3rem', display: 'flex', alignItems: 'center', borderRadius: '4px' }}
      >
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
          <path d='M13.73 21a2 2 0 0 1-3.46 0' />
        </svg>
        {count > 0 && (
          <span style={{ position: 'absolute', top: '-3px', right: '-3px', background: '#ef4444', color: '#fff', borderRadius: '999px', fontSize: '0.625rem', fontWeight: 700, minWidth: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
            {count}
          </span>
        )}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', zIndex: 999, minWidth: '280px' }}>
          <div style={{ padding: '0.625rem 1rem', fontWeight: 600, fontSize: '0.875rem', borderBottom: '1px solid #e2e8f0' }}>Notifications</div>
          {notifications.map((n, i) => (
            <div key={i} style={{ padding: '0.625rem 1rem', borderBottom: i < notifications.length - 1 ? '1px solid #f1f5f9' : 'none', fontSize: '0.875rem', color: '#1e293b' }}>
              <div>{n.message}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.2rem' }}>{n.date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const ThreeItems: Story = {
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[CreateCaseView, SearchView, ReportsView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Create Case',
    navLabel2: 'Search',
    navLabel3: 'Reports'
  }
};

export const FourItems: Story = {
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[DashboardView, CreateCaseView, SearchView, ReportsView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Dashboard',
    navLabel2: 'Create Case',
    navLabel3: 'Search',
    navLabel4: 'Reports'
  }
};

export const SevenItems: Story = {
  name: 'Seven items (max)',
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[DashboardView, CreateCaseView, SearchView, ReportsView, AdminView, AuditView, HelpView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Dashboard',
    navLabel2: 'Create Case',
    navLabel3: 'Search',
    navLabel4: 'Reports',
    navLabel5: 'Admin',
    navLabel6: 'Audit Log',
    navLabel7: 'Help'
  }
};

export const WithDefaultSlot: Story = {
  name: 'Default slot — opens on Reports',
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[DashboardView, CreateCaseView, SearchView, ReportsView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Dashboard',
    navLabel2: 'Create Case',
    navLabel3: 'Search',
    navLabel4: 'Reports',
    defaultSlot: 'Reports'
  }
};

export const WithNotificationBell: Story = {
  name: 'With Notification Bell in nav header',
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[
        DashboardView,
        CreateCaseView,
        SearchView,
        ReportsView,
        undefined,    // Slot5
        undefined,    // Slot6
        undefined,    // Slot7
        <MockNotificationBell count={3} /> // NavHeaderSlot
      ]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Dashboard',
    navLabel2: 'Create Case',
    navLabel3: 'Search',
    navLabel4: 'Reports'
  }
};

export const SingleItem: Story = {
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[CreateCaseView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Create Case'
  }
};

export const EmptySlot: Story = {
  name: 'With empty slot (no content for item 2)',
  render: args => (
    <DevDXExtensionsSideNavLayout {...args} getPConnect={makePConnect()}>
      {[CreateCaseView, undefined, ReportsView]}
    </DevDXExtensionsSideNavLayout>
  ),
  args: {
    navLabel1: 'Create Case',
    navLabel2: 'Search',
    navLabel3: 'Reports'
  }
};
