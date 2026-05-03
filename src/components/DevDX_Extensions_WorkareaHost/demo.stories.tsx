// @ts-nocheck
import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsWorkareaHost } from './index';

const meta: Meta<typeof DevDXExtensionsWorkareaHost> = {
  title: 'Widgets/Workarea Host',
  component: DevDXExtensionsWorkareaHost,
  excludeStories: /.*Data$/,
  parameters: { layout: 'padded' },
  argTypes: {
    getPConnect:    { table: { disable: true } },
    showCaseDetails: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsWorkareaHost>;

const makePConnect = (contextName = 'app/primary_1') => () => ({
  getContextName:    () => contextName,
  getInheritedProps: () => ({})
});

const withMockPCore = (workareaItems: any, storeState: any = {}) => (Story: any) => {
  useEffect(() => {
    (window as any).PCore = {
      getContainerUtils: () => ({
        areContainerItemsPresent: (target: string) => target.includes('workarea') && !!workareaItems,
        getActiveContainerItemContext: () => workareaItems ? 'app/primary_1/workarea_1' : null,
        closeContainerItem: (ctx: string) => { console.log('closeContainerItem', ctx); }
      }),
      getStore: () => ({
        getState: () => storeState,
        subscribe: (fn: any) => { fn(); return () => {}; }
      }),
      getEvents: () => ({
        getCaseEvent: () => ({
          CASE_OPENED: 'caseOpened', ASSIGNMENT_OPENED: 'assignmentOpened',
          ASSIGNMENT_SUBMISSION: 'assignmentSubmission', CASE_CLOSED: 'caseClosed',
          CREATE_STAGE_DONE: 'createStageDone', CURRENT_ASSIGNMENT_UPDATED: 'currentAssignmentUpdated'
        })
      }),
      getPubSubUtils: () => ({
        subscribe:   () => {},
        unsubscribe: () => {}
      })
    };
    return () => { delete (window as any).PCore; };
  }, []);
  return <div style={{ width: '420px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}><Story /></div>;
};

const mockStoreWithCase = {
  data: {
    app: {
      primary_1: {
        workarea_1: {
          caseInfo: {
            ID: 'APP-WORK-101',
            status: 'Open',
            currentAssignmentName: 'Gather Information'
          },
          assignmentInfo: {
            name: 'Gather Information',
            urgency: '25'
          }
        }
      }
    }
  }
};

const mockStoreHighUrgency = {
  data: {
    app: {
      primary_1: {
        workarea_1: {
          caseInfo: { ID: 'APP-WORK-205', status: 'Pending' },
          assignmentInfo: { name: 'Risk Assessment', urgency: '75' }
        }
      }
    }
  }
};

export const Empty: Story = {
  name: 'Empty — no active work item',
  decorators: [withMockPCore(null)],
  args: {
    emptyStateMessage: 'No active work item. Create or open a case to get started.',
    showCaseDetails:   true,
    getPConnect:       makePConnect()
  }
};

export const ActiveCase: Story = {
  name: 'Active — case in workarea',
  decorators: [withMockPCore(true, mockStoreWithCase)],
  args: {
    showCaseDetails: true,
    getPConnect:     makePConnect()
  }
};

export const HighUrgency: Story = {
  name: 'Active — high urgency case',
  decorators: [withMockPCore(true, mockStoreHighUrgency)],
  args: {
    showCaseDetails: true,
    getPConnect:     makePConnect()
  }
};

export const NoDetails: Story = {
  name: 'Active — details hidden',
  decorators: [withMockPCore(true, mockStoreWithCase)],
  args: {
    showCaseDetails: false,
    getPConnect:     makePConnect()
  }
};
