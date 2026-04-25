import type { Meta, StoryObj } from '@storybook/react';
import DevDXExtensionsLayout1 from './index';
import { Grid, Text } from '@pega/cosmos-react-core';

const meta: Meta<typeof DevDXExtensionsLayout1> = {
  title: 'Components/DevDX_Extensions_Layout1',
  component: DevDXExtensionsLayout1,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock getPConnect function
const mockPConnect = {
  getInheritedProps: () => ({}),
};

// Sample content component
const SampleContent = ({ title, number }: { title: string; number: number }) => (
  <div style={{ padding: '12px' }}>
    <h3>{title}</h3>
    <p>Content Block {number}</p>
  </div>
);

/**
 * Two Column Layout - Default
 */
export const TwoColumn: Story = {
  args: {
    layoutMode: 'TWO_COLUMN',
    columnGap: '16',
    rowGap: '16',
    children: [
      <SampleContent key="1" title="Column 1" number={1} />,
      <SampleContent key="2" title="Column 2" number={2} />,
    ],
    getPConnect: () => mockPConnect as any,
  },
};

/**
 * Three Column Layout
 */
export const ThreeColumn: Story = {
  args: {
    layoutMode: 'THREE_COLUMN',
    columnGap: '16',
    rowGap: '16',
    children: [
      <SampleContent key="1" title="Column 1" number={1} />,
      <SampleContent key="2" title="Column 2" number={2} />,
      <SampleContent key="3" title="Column 3" number={3} />,
    ],
    getPConnect: () => mockPConnect as any,
  },
};

/**
 * Single Column Layout
 */
export const SingleColumn: Story = {
  args: {
    layoutMode: 'SINGLE_COLUMN',
    columnGap: '16',
    rowGap: '16',
    children: [
      <SampleContent key="1" title="Full Width Section 1" number={1} />,
      <SampleContent key="2" title="Full Width Section 2" number={2} />,
      <SampleContent key="3" title="Full Width Section 3" number={3} />,
    ],
    getPConnect: () => mockPConnect as any,
  },
};

/**
 * Custom Spacing
 */
export const CustomSpacing: Story = {
  args: {
    layoutMode: 'TWO_COLUMN',
    columnGap: '24',
    rowGap: '24',
    children: [
      <SampleContent key="1" title="Column 1" number={1} />,
      <SampleContent key="2" title="Column 2" number={2} />,
    ],
    getPConnect: () => mockPConnect as any,
  },
};

/**
 * Read Only Mode
 */
export const ReadOnlyMode: Story = {
  args: {
    layoutMode: 'TWO_COLUMN',
    columnGap: '16',
    rowGap: '16',
    displayMode: 'DISPLAY_ONLY',
    children: [
      <SampleContent key="1" title="Column 1" number={1} />,
      <SampleContent key="2" title="Column 2" number={2} />,
    ],
    getPConnect: () => mockPConnect as any,
  },
};
