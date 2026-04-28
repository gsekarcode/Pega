import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsDataTransformButton } from './index';
import { mockPConnect } from './mock';

const meta: Meta<typeof DevDXExtensionsDataTransformButton> = {
  title: 'Components/DevDX_Extensions_DataTransformButton',
  component: DevDXExtensionsDataTransformButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

const base = {
  dataTransformName: 'SetDefaultValues',
  showFeedback:      true,
  labelLoading:      'Running…',
  labelSuccess:      'Done',
  getPConnect:       mockPConnect as any
};

export const Primary: Story = {
  args: { ...base, label: 'Run Data Transform', variant: 'primary', size: 'default' }
};

export const Secondary: Story = {
  args: { ...base, label: 'Run Data Transform', variant: 'secondary', size: 'default' }
};

export const Simple: Story = {
  args: { ...base, label: 'Run Data Transform', variant: 'simple', size: 'default' }
};

export const Compact: Story = {
  args: { ...base, label: 'Run', variant: 'primary', size: 'compact' }
};

export const NoFeedback: Story = {
  args: { ...base, label: 'Silent Run', variant: 'secondary', size: 'default', showFeedback: false }
};

export const NotConfigured: Story = {
  args: {
    ...base,
    label: 'No DT set',
    dataTransformName: '',
    variant: 'primary',
    size: 'default'
  }
};
