// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsCheckboxButtonGroup } from './index';

const meta: Meta<typeof DevDXExtensionsCheckboxButtonGroup> = {
  title: 'Fields/Checkbox Button Group',
  component: DevDXExtensionsCheckboxButtonGroup,
  excludeStories: /.*Data$/,
  argTypes: {
    displayMode: { table: { disable: true } },
    variant: { table: { disable: true } },
    getPConnect: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsCheckboxButtonGroup>;

const makePConnect = (onUpdate?: (val: string) => void) => () => ({
  getStateProps: () => ({ value: '.Tags' }),
  getActionsApi: () => ({
    updateFieldValue: (_prop: string, val: string) => onUpdate?.(val),
    triggerFieldChange: () => {}
  }),
  ignoreSuggestion: () => {},
  getInheritedProps: () => ({})
});

const FEW_OPTIONS = 'JavaScript,TypeScript,Python,Java,Go';

const MANY_OPTIONS = [
  'React', 'Vue', 'Angular', 'Svelte', 'Ember',
  'Node.js', 'Express', 'FastAPI', 'Django', 'Spring',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'GraphQL', 'REST', 'gRPC', 'WebSockets', 'MQTT',
  'Jest', 'Cypress', 'Playwright', 'Storybook', 'Webpack'
].join(',');

export const Default: Story = {
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Programming Languages',
    optionsList: FEW_OPTIONS,
    value: 'JavaScript,Python',
    helperText: 'Select all that apply',
    required: false,
    disabled: false,
    readOnly: false,
    hideLabel: false,
    validatemessage: '',
    testId: 'checkbox-btn-group'
  }
};

export const KeyValueOptions: Story = {
  name: 'Key:Value options',
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Preferred Contact',
    optionsList: 'EMAIL:Email,PHONE:Phone,SMS:SMS,POST:Post',
    value: 'EMAIL',
    helperText: 'We will use these to reach you'
  }
};

export const ThirtyOptions: Story = {
  name: '30 options — wrapping',
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Tech Stack',
    optionsList: MANY_OPTIONS,
    value: 'React,Node.js,PostgreSQL,Docker',
    helperText: 'Select everything your team uses'
  }
};

export const WithValidationError: Story = {
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Programming Languages',
    optionsList: FEW_OPTIONS,
    value: '',
    required: true,
    validatemessage: 'Please select at least one option'
  }
};

export const ReadOnly: Story = {
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Programming Languages',
    optionsList: FEW_OPTIONS,
    value: 'TypeScript,Go',
    readOnly: true
  }
};

export const Disabled: Story = {
  render: args => <DevDXExtensionsCheckboxButtonGroup {...args} getPConnect={makePConnect()} />,
  args: {
    label: 'Programming Languages',
    optionsList: FEW_OPTIONS,
    value: 'Java',
    disabled: true
  }
};

export const DisplayOnly: Story = {
  render: () => (
    <DevDXExtensionsCheckboxButtonGroup
      label='Languages'
      optionsList={FEW_OPTIONS}
      value='JavaScript,TypeScript'
      displayMode='DISPLAY_ONLY'
      getPConnect={makePConnect()}
    />
  )
};
