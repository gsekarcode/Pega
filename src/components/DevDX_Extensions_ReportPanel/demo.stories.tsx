// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsReportPanel } from './index';

const meta: Meta<typeof DevDXExtensionsReportPanel> = {
  title: 'Components/Report Panel',
  component: DevDXExtensionsReportPanel,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsReportPanel>;

const makePConnect = () => () => ({
  getInheritedProps: () => ({}),
  getContextName: () => 'app/primary'
});

export const StaticStats: Story = {
  args: {
    heading: 'Reports',
    stat1Label: 'Open Cases',
    stat1Value: '142',
    stat1Color: '#2563eb',
    stat2Label: 'Resolved Today',
    stat2Value: '38',
    stat2Color: '#16a34a',
    stat3Label: 'Avg Resolution (hrs)',
    stat3Value: '4.2',
    stat3Color: '#9333ea',
    getPConnect: makePConnect()
  }
};

export const CustomHeading: Story = {
  args: {
    heading: 'Case Summary',
    stat1Label: 'New Today',
    stat1Value: '27',
    stat1Color: '#0891b2',
    stat2Label: 'Escalated',
    stat2Value: '5',
    stat2Color: '#dc2626',
    stat3Label: 'SLA Met (%)',
    stat3Value: '94',
    stat3Color: '#16a34a',
    getPConnect: makePConnect()
  }
};

export const TwoStats: Story = {
  args: {
    heading: 'Quick Stats',
    stat1Label: 'Open Cases',
    stat1Value: '58',
    stat1Color: '#2563eb',
    stat2Label: 'Closed Cases',
    stat2Value: '201',
    stat2Color: '#16a34a',
    getPConnect: makePConnect()
  }
};
