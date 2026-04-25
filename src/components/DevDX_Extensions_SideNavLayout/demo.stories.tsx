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
    getPConnect: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsSideNavLayout>;

const makePConnect = () => () => ({
  getInheritedProps: () => ({})
});

// ── Mock views rendered into each slot ──────────────────────────────────────

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
        { label: 'Open Cases', value: '142', color: '#2563eb' },
        { label: 'Resolved Today', value: '38', color: '#16a34a' },
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

// ── Stories ─────────────────────────────────────────────────────────────────

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
