// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsRadioButtonGroup } from './index';

const meta: Meta<typeof DevDXExtensionsRadioButtonGroup> = {
  title: 'Fields/Radio Button Group',
  component: DevDXExtensionsRadioButtonGroup,
  excludeStories: /.*Data$/,
  argTypes: {
    displayMode: { table: { disable: true } },
    variant: { table: { disable: true } },
    getPConnect: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsRadioButtonGroup>;

const makePConnect = () => () => ({
  getStateProps: () => ({ value: '.Choice' }),
  getActionsApi: () => ({
    updateFieldValue: () => {},
    triggerFieldChange: () => {}
  }),
  ignoreSuggestion: () => {},
  getInheritedProps: () => ({})
});

export const TwoOptions: Story = {
  name: '2 options — 50% / 50%',
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Decision',
    optionsList: 'Y:Yes,N:No',
    value: 'Y',
    testId: 'radio-2'
  }
};

export const ThreeOptions: Story = {
  name: '3 options — 33% each',
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Priority',
    optionsList: 'LOW:Low,MED:Medium,HIGH:High',
    value: 'MED',
    testId: 'radio-3'
  }
};

export const FourOptions: Story = {
  name: '4 options — 25% each',
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Status',
    optionsList: 'NEW:New,OPEN:Open,PENDING:Pending,CLOSED:Closed',
    value: 'OPEN',
    testId: 'radio-4'
  }
};

export const FiveOptions: Story = {
  name: '5 options — 20% each',
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Rating',
    optionsList: '1:★,2:★★,3:★★★,4:★★★★,5:★★★★★',
    value: '3',
    helperText: 'Select your overall rating',
    testId: 'radio-5'
  }
};

export const ManyOptions: Story = {
  name: 'Many options — wraps to next row',
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Department',
    optionsList: 'HR:HR,FIN:Finance,ENG:Engineering,SALES:Sales,OPS:Operations,MKT:Marketing,LEGAL:Legal,IT:IT',
    value: 'ENG',
    testId: 'radio-many'
  }
};

export const WithValidationError: Story = {
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Decision',
    optionsList: 'Y:Yes,N:No',
    value: '',
    required: true,
    validatemessage: 'Please select an option'
  }
};

export const ReadOnly: Story = {
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Priority',
    optionsList: 'LOW:Low,MED:Medium,HIGH:High',
    value: 'HIGH',
    readOnly: true
  }
};

export const Disabled: Story = {
  render: args => <DevDXExtensionsRadioButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Priority',
    optionsList: 'LOW:Low,MED:Medium,HIGH:High',
    value: 'LOW',
    disabled: true
  }
};
