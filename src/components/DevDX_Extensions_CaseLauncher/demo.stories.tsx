// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsCaseLauncher } from './index';

const meta: Meta<typeof DevDXExtensionsCaseLauncher> = {
  title: 'Widgets/Case Launcher',
  component: DevDXExtensionsCaseLauncher,
  excludeStories: /.*Data$/,
  argTypes: {
    classFilter: {
      options: ['Work-MyApp-Work-Request', 'Work-MyApp-Work-Complaint'],
      control: { type: 'select' }
    },
    autoLaunch: {
      control: { type: 'boolean' }
    },
    getPConnect: {
      table: { disable: true }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsCaseLauncher>;

const setPCore = () => {
  (window as any).PCore = {
    getEnvironmentInfo: () => ({})
  };
};

const makePConnect = (onCreate?: (className: string) => void) => () => ({
  getActionsApi: () => ({
    createWork: (className: string, options: any) => {
      if (onCreate) {
        onCreate(className);
      } else {
        // eslint-disable-next-line no-alert
        alert(`createWork called — className: ${className}, flowType: ${options?.flowType}`);
      }
    }
  })
});

/* ── Default: manual launch ─────────────────────────────────────────── */
export const Default: Story = {
  render: args => {
    setPCore();
    return <DevDXExtensionsCaseLauncher {...args} getPConnect={makePConnect()} />;
  },
  args: {
    heading: 'Start a Case',
    description: 'Click the button below to create a new case.',
    classFilter: 'Work-MyApp-Work-Request',
    labelPrimaryButton: 'Create case',
    autoLaunch: false
  }
};

/* ── AutoLaunch: case created as soon as widget mounts ──────────────── */
export const AutoLaunch: Story = {
  render: args => {
    setPCore();
    return <DevDXExtensionsCaseLauncher {...args} getPConnect={makePConnect()} />;
  },
  args: {
    heading: 'Auto-Launching Case',
    description: 'This widget will automatically create a case when it appears on screen.',
    classFilter: 'Work-MyApp-Work-Request',
    labelPrimaryButton: 'Create case',
    autoLaunch: true
  }
};

/* ── WithoutDescription ─────────────────────────────────────────────── */
export const NoDescription: Story = {
  render: args => {
    setPCore();
    return <DevDXExtensionsCaseLauncher {...args} getPConnect={makePConnect()} />;
  },
  args: {
    heading: 'File a Complaint',
    description: '',
    classFilter: 'Work-MyApp-Work-Complaint',
    labelPrimaryButton: 'File now',
    autoLaunch: false
  }
};
