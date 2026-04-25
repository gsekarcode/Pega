// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Input, DateInput } from '@pega/cosmos-react-core';
import { DevDXExtensionsScreenFlowForm } from './index';

const meta: Meta<typeof DevDXExtensionsScreenFlowForm> = {
  title: 'Templates/Screen Flow Form',
  component: DevDXExtensionsScreenFlowForm,
  excludeStories: /.*Data$/,
  argTypes: {
    currentStep: { control: { type: 'number', min: 1, max: 5 } },
    showStepProgress: { control: 'boolean' },
    showNavigationButtons: { control: 'boolean' },
    getPConnect: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsScreenFlowForm>;

const makePConnect = () => () => ({
  getContextName: () => 'assignment_1',
  getInheritedProps: () => ({}),
  getActionsApi: () => ({
    finishAssignment: (ctx: string, opts: any) => {
      // eslint-disable-next-line no-alert
      alert(`finishAssignment(${ctx}) — outcomeID: "${opts.outcomeID}"`);
      return Promise.resolve();
    },
    cancelAction: (ctx: string) => {
      // eslint-disable-next-line no-alert
      alert(`cancelAction(${ctx})`);
    }
  })
});

const STEP_LABELS = 'Personal Info,Contact Details,Review & Confirm,Submit';

// ── Step 1 ─────────────────────────────────────────────────────────────────
export const Step1: Story = {
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input label='First Name' value='' onChange={() => {}} />
        <Input label='Last Name' value='' onChange={() => {}} />
        <DateInput label='Date of Birth' value='' onChange={() => {}} />
      </div>
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Personal Information',
    stepLabels: STEP_LABELS,
    currentStep: 1,
    showStepProgress: true,
    showNavigationButtons: true,
    labelPrevious: 'Previous',
    labelNext: 'Next',
    labelSubmit: 'Submit',
  }
};

// ── Step 2 — middle ────────────────────────────────────────────────────────
export const Step2: Story = {
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input label='Email' type='email' value='' onChange={() => {}} />
        <Input label='Phone' value='' onChange={() => {}} />
        <Input label='Address' value='' onChange={() => {}} />
      </div>
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Contact Details',
    stepLabels: STEP_LABELS,
    currentStep: 2,
    showStepProgress: true,
    showNavigationButtons: true,
    labelPrevious: 'Previous',
    labelNext: 'Next',
    labelSubmit: 'Submit',
  }
};

// ── Step 3 — review ────────────────────────────────────────────────────────
export const Step3Review: Story = {
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ color: '#6b7280' }}>First Name</span><span>John</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ color: '#6b7280' }}>Last Name</span><span>Doe</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ color: '#6b7280' }}>Email</span><span>john.doe@example.com</span>
        </div>
      </div>
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Review & Confirm',
    stepLabels: STEP_LABELS,
    currentStep: 3,
    showStepProgress: true,
    showNavigationButtons: true,
    labelPrevious: 'Previous',
    labelNext: 'Next',
    labelSubmit: 'Submit',
  }
};

// ── Last step — Submit button shown ───────────────────────────────────────
export const LastStep: Story = {
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
        ✅ All information is complete. Click Submit to create the case.
      </div>
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Submit',
    stepLabels: STEP_LABELS,
    currentStep: 4,
    showStepProgress: true,
    showNavigationButtons: true,
    labelPrevious: 'Previous',
    labelSubmit: 'Submit Case',
  }
};

// ── No stepper ─────────────────────────────────────────────────────────────
export const WithoutStepper: Story = {
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <Input label='Case Description' value='' onChange={() => {}} />
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Case Details',
    stepLabels: STEP_LABELS,
    currentStep: 2,
    showStepProgress: false,
    showNavigationButtons: true,
    labelPrevious: 'Previous',
    labelNext: 'Next',
  }
};

// ── Platform-managed navigation (no buttons) ──────────────────────────────
export const NoNavigationButtons: Story = {
  name: 'Navigation managed by platform',
  render: args => (
    <DevDXExtensionsScreenFlowForm {...args} getPConnect={makePConnect()}>
      <Input label='Case Description' value='' onChange={() => {}} />
    </DevDXExtensionsScreenFlowForm>
  ),
  args: {
    heading: 'Case Details',
    stepLabels: STEP_LABELS,
    currentStep: 2,
    showStepProgress: true,
    showNavigationButtons: false
  }
};
