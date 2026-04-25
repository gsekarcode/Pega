// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsKPICard } from './index';

const meta: Meta<typeof DevDXExtensionsKPICard> = {
  title: 'Components/KPI Card',
  component: DevDXExtensionsKPICard,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsKPICard>;

const makePConnect = () => () => ({ getInheritedProps: () => ({}) });

export const OpenCases: Story = {
  args: {
    label: 'Open Cases',
    value: '142',
    color: '#2563eb',
    getPConnect: makePConnect()
  }
};

export const ResolvedToday: Story = {
  args: {
    label: 'Resolved Today',
    value: '38',
    color: '#16a34a',
    getPConnect: makePConnect()
  }
};

export const AvgResolution: Story = {
  args: {
    label: 'Avg Resolution (hrs)',
    value: '4.2',
    color: '#9333ea',
    getPConnect: makePConnect()
  }
};

export const AllThree: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {[
        { label: 'Open Cases', value: '142', color: '#2563eb' },
        { label: 'Resolved Today', value: '38', color: '#16a34a' },
        { label: 'Avg Resolution (hrs)', value: '4.2', color: '#9333ea' }
      ].map(stat => (
        <DevDXExtensionsKPICard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          getPConnect={makePConnect()}
        />
      ))}
    </div>
  )
};
