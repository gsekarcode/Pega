import type { Meta, StoryObj } from '@storybook/react';
import DevDXExtensionsCollapsibleLayout from './index';

const meta: Meta<typeof DevDXExtensionsCollapsibleLayout> = {
  title: 'Components/DevDX_Extensions_CollapsibleLayout',
  component: DevDXExtensionsCollapsibleLayout,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPConnect = { getInheritedProps: () => ({}) };

const Block = ({ label }: { label: string }) => (
  <div style={{ padding: '12px', background: '#fff', borderRadius: 6 }}>
    <strong>{label}</strong>
    <p style={{ margin: '6px 0 0', color: '#666', fontSize: '0.875rem' }}>
      Sample content for {label}.
    </p>
  </div>
);

// Default — collapsibility off, content always visible
export const Default: Story = {
  args: {
    heading: 'Personal Information',
    collapsible: false,
    defaultBehaviour: 'expanded',
    children: [<Block key='1' label='Name' />, <Block key='2' label='Address' />],
    getPConnect: () => mockPConnect as any
  }
};

// Collapsible, starts expanded
export const CollapsibleExpanded: Story = {
  args: {
    heading: 'Contact Details',
    collapsible: true,
    defaultBehaviour: 'expanded',
    children: [<Block key='1' label='Email' />, <Block key='2' label='Phone' />],
    getPConnect: () => mockPConnect as any
  }
};

// Collapsible, starts collapsed
export const CollapsibleCollapsed: Story = {
  args: {
    heading: 'Additional Details',
    collapsible: true,
    defaultBehaviour: 'collapsed',
    children: [<Block key='1' label='Notes' />, <Block key='2' label='Tags' />],
    getPConnect: () => mockPConnect as any
  }
};

// Single region
export const SingleRegion: Story = {
  args: {
    heading: 'Summary',
    collapsible: true,
    defaultBehaviour: 'expanded',
    children: [<Block key='1' label='Full Width Content' />],
    getPConnect: () => mockPConnect as any
  }
};
