// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsSSNField } from './index';
import type { SSNFieldProps } from './index';

const meta: Meta<typeof DevDXExtensionsSSNField> = {
  title: 'Fields/SSN Field',
  component: DevDXExtensionsSSNField,
  excludeStories: /.*Data$/,
  argTypes: {
    displayMode: { table: { disable: true } },
    variant: { table: { disable: true } },
    getPConnect: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsSSNField>;

const setPCore = () => {
  (window as any).PCore = {
    getComponentsRegistry: () => ({ getLazyComponent: (f: string) => f }),
    getEnvironmentInfo: () => ({ getTimeZone: () => 'local' })
  };
};

const makePConnect = (currentValue = '') => () => ({
  getStateProps: () => ({ value: '.SSN' }),
  getActionsApi: () => ({
    updateFieldValue: () => {},
    triggerFieldChange: () => {}
  }),
  ignoreSuggestion: () => {},
  acceptSuggestion: () => {},
  getInheritedProps: () => ({})
});

const SSNDemo = (args: Partial<any>) => ({
  render: (storyArgs: any) => {
    setPCore();
    return <DevDXExtensionsSSNField {...storyArgs} getPConnect={makePConnect(storyArgs.value)} />;
  },
  args
});

export const Default: Story = SSNDemo({
  label: 'Social Security Number',
  value: '',
  placeholder: '###-##-####',
  helperText: 'Enter your 9-digit SSN',
  required: false,
  disabled: false,
  readOnly: false,
  hideLabel: false,
  validatemessage: '',
  testId: 'ssn-field'
});

export const WithValue: Story = SSNDemo({
  label: 'Social Security Number',
  value: '123456789',
  helperText: 'SSN is masked by default — click Show to reveal',
  testId: 'ssn-field-with-value'
});

export const ReadOnly: Story = SSNDemo({
  label: 'Social Security Number',
  value: '123456789',
  readOnly: true,
  testId: 'ssn-field-readonly'
});

export const DisplayOnly: Story = {
  render: () => {
    setPCore();
    return (
      <DevDXExtensionsSSNField
        label='Social Security Number'
        value='123456789'
        displayMode='DISPLAY_ONLY'
        getPConnect={makePConnect('123456789')}
        testId='ssn-field-display'
      />
    );
  }
};

export const LabelsLeft: Story = {
  render: () => {
    setPCore();
    return (
      <DevDXExtensionsSSNField
        label='Social Security Number'
        value='123456789'
        displayMode='LABELS_LEFT'
        getPConnect={makePConnect('123456789')}
        testId='ssn-field-labels-left'
      />
    );
  }
};

export const WithError: Story = SSNDemo({
  label: 'Social Security Number',
  value: '123',
  validatemessage: 'Please enter a valid 9-digit SSN',
  testId: 'ssn-field-error'
});

export const Disabled: Story = SSNDemo({
  label: 'Social Security Number',
  value: '123456789',
  disabled: true,
  testId: 'ssn-field-disabled'
});
