import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsBooleanButton } from './index';
import { mockPConnect } from './mock';

const meta: Meta<typeof DevDXExtensionsBooleanButton> = {
  title: 'Components/DevDX_Extensions_BooleanButton',
  component: DevDXExtensionsBooleanButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsBooleanButton>;

// Default — value false, button enabled
export const Default: Story = {
  render: function RenderStory(args) {
    const [value, setValue] = useState(false);
    return (
      <DevDXExtensionsBooleanButton
        {...args}
        value={value}
        getPConnect={mockPConnect(setValue) as any}
      />
    );
  },
  args: {
    label: 'Terms & Conditions',
    labelFalse: 'Accept',
    labelTrue: 'Accepted',
    helperText: 'Click to accept',
    required: false,
    disabled: false,
    readOnly: false,
    hideLabel: false,
    testId: 'bool-btn-default',
    validatemessage: ''
  }
};

// Pre-confirmed — value true, button disabled
export const Confirmed: Story = {
  render: function RenderStory(args) {
    const [value, setValue] = useState(true);
    return (
      <DevDXExtensionsBooleanButton
        {...args}
        value={value}
        getPConnect={mockPConnect(setValue) as any}
      />
    );
  },
  args: { ...Default.args, label: 'Terms & Conditions (pre-confirmed)' }
};

// Disabled
export const Disabled: Story = {
  render: Default.render,
  args: { ...Default.args, label: 'Disabled field', disabled: true }
};

// With validation error
export const WithError: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    label: 'Acceptance required',
    validatemessage: 'You must accept before continuing.'
  }
};

// Display only
export const DisplayOnly: Story = {
  render: function RenderStory(args) {
    return (
      <DevDXExtensionsBooleanButton
        {...args}
        value={false}
        getPConnect={mockPConnect() as any}
      />
    );
  },
  args: { ...Default.args, label: 'Display Only', displayMode: 'DISPLAY_ONLY' }
};
