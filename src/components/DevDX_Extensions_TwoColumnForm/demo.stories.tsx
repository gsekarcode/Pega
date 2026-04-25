// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Input, DateInput } from '@pega/cosmos-react-core';

import DevDXExtensionsTwoColumnForm from './index';

const meta: Meta<typeof DevDXExtensionsTwoColumnForm> = {
  title: 'Templates/Two Column Form',
  component: DevDXExtensionsTwoColumnForm,
  excludeStories: /.*Data$/,
  parameters: {
    type: 'Template'
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsTwoColumnForm>;

const makePConnect = (inheritedProps = {}) => () => ({
  getInheritedProps: () => inheritedProps,
  getChildren: () => [],
  createComponent: (config: any) => config
});

// Mock field elements that simulate what Pega renders into each region
const regionAFields = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Input label='First Name' value='John' onChange={() => {}} />
    <Input label='Last Name' value='Doe' onChange={() => {}} />
    <Input label='Email' type='email' value='john.doe@example.com' onChange={() => {}} />
  </div>
);

const regionBFields = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Input label='Phone Number' value='+1 639-797-5093' onChange={() => {}} />
    <DateInput
      label='Service Date'
      value='2024-01-25'
      onChange={() => {}}
    />
    <Input label='Address' value='123 Main St' onChange={() => {}} />
  </div>
);

export const EqualColumns: Story = {
  args: {
    label: 'Personal Information',
    showLabel: true,
    leftColWidth: '50',
    rightColWidth: '50'
  },
  render: args => (
    <DevDXExtensionsTwoColumnForm
      {...args}
      getPConnect={makePConnect()}
    >
      {[regionAFields, regionBFields]}
    </DevDXExtensionsTwoColumnForm>
  )
};

export const NarrowLeft: Story = {
  args: {
    label: 'Contact Details',
    showLabel: true,
    leftColWidth: '25',
    rightColWidth: '75'
  },
  render: args => (
    <DevDXExtensionsTwoColumnForm
      {...args}
      getPConnect={makePConnect()}
    >
      {[regionAFields, regionBFields]}
    </DevDXExtensionsTwoColumnForm>
  )
};

export const NarrowRight: Story = {
  args: {
    label: 'Contact Details',
    showLabel: true,
    leftColWidth: '75',
    rightColWidth: '25'
  },
  render: args => (
    <DevDXExtensionsTwoColumnForm
      {...args}
      getPConnect={makePConnect()}
    >
      {[regionAFields, regionBFields]}
    </DevDXExtensionsTwoColumnForm>
  )
};

export const NoLabel: Story = {
  args: {
    label: '',
    showLabel: false,
    leftColWidth: '50',
    rightColWidth: '50'
  },
  render: args => (
    <DevDXExtensionsTwoColumnForm
      {...args}
      getPConnect={makePConnect()}
    >
      {[regionAFields, regionBFields]}
    </DevDXExtensionsTwoColumnForm>
  )
};

export const InheritedWidths: Story = {
  args: {
    label: 'Inherited Config',
    showLabel: true
  },
  render: args => (
    <DevDXExtensionsTwoColumnForm
      {...args}
      getPConnect={makePConnect({ leftColWidth: '30%', rightColWidth: '70%' })}
    >
      {[regionAFields, regionBFields]}
    </DevDXExtensionsTwoColumnForm>
  )
};
