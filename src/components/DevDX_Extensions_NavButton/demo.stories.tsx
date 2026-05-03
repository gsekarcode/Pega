// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsNavButton } from './index';

const meta: Meta<typeof DevDXExtensionsNavButton> = {
  title: 'Fields/Navigation Button',
  component: DevDXExtensionsNavButton,
  excludeStories: /.*Data$/,
  parameters: { layout: 'centered' },
  argTypes: {
    getPConnect: { table: { disable: true } },
    variant:     { control: 'select', options: ['primary', 'secondary', 'link'] }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsNavButton>;

const makePConnect = () => () => ({
  getContextName:   () => 'app/primary_1',
  getInheritedProps: () => ({}),
  getActionsApi:    () => ({
    openLocalAction: (pageName: string, opts: any) => {
      console.log('openLocalAction', pageName, opts);
      return Promise.resolve();
    }
  })
});

export const Default: Story = {
  args: {
    buttonLabel: 'Open Service Request',
    className:   'APP-WORK-SERVICEREQUEST',
    pageName:    'pyStartCase',
    variant:     'primary',
    getPConnect: makePConnect()
  }
};

export const WithLabel: Story = {
  args: {
    label:       'Quick action',
    buttonLabel: 'Open Case',
    className:   'APP-WORK-COMPLAINT',
    pageName:    'EditDetails',
    variant:     'primary',
    getPConnect: makePConnect()
  }
};

export const Secondary: Story = {
  args: {
    buttonLabel: 'View Details',
    className:   'APP-WORK-ENQUIRY',
    pageName:    'pyReviewHarness',
    variant:     'secondary',
    getPConnect: makePConnect()
  }
};

export const LinkVariant: Story = {
  args: {
    buttonLabel: 'Go to page',
    className:   'APP-WORK-SERVICEREQUEST',
    pageName:    'pyStartCase',
    variant:     'link',
    getPConnect: makePConnect()
  }
};

export const Disabled: Story = {
  args: {
    buttonLabel: 'Open',
    className:   'APP-WORK-SERVICEREQUEST',
    pageName:    'pyStartCase',
    variant:     'primary',
    disabled:    true,
    getPConnect: makePConnect()
  }
};

export const Misconfigured: Story = {
  name: 'Misconfigured — no page name',
  args: {
    buttonLabel: 'Open',
    className:   'APP-WORK-SERVICEREQUEST',
    pageName:    '',
    variant:     'primary',
    getPConnect: makePConnect()
  }
};
