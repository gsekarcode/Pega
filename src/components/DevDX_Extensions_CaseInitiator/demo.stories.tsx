// @ts-nocheck
import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsCaseInitiator } from './index';

const meta: Meta<typeof DevDXExtensionsCaseInitiator> = {
  title: 'Widgets/Case Initiator',
  component: DevDXExtensionsCaseInitiator,
  excludeStories: /.*Data$/,
  parameters: { layout: 'centered' },
  argTypes: {
    getPConnect:     { table: { disable: true } },
    containerName:   { control: 'select', options: ['primary', 'workarea', 'modal'] },
    autoCreate:      { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<typeof DevDXExtensionsCaseInitiator>;

// ── Helpers ──────────────────────────────────────────────────────────────────

const makePConnect = () => () => ({
  getContextName:   () => 'app/primary',
  getInheritedProps: () => ({}),
  getActionsApi:    () => ({
    createWork:  (cls: string, opts: any) => { console.log('createWork', cls, opts); },
    openWork:    (id: string, opts: any)  => { console.log('openWork', id, opts); }
  })
});

const mockPCoreSuccess = (assignment = { ID: 'ASSIGN-1!FLOW', name: 'Gather Information', urgency: 10, type: 'Worklist' }) => ({
  getRestClient: () => ({
    invokeRestApi: () =>
      Promise.resolve({
        data: {
          ID: 'APP-WORK-101',
          data: {
            caseInfo: {
              ID: 'APP-WORK-101',
              status: 'New',
              caseTypeName: 'Service Request',
              assignments: [assignment]
            }
          }
        }
      })
  }),
  getMashupApi: () => ({
    openAssignment: (id: string) => { console.log('openAssignment', id); }
  })
});

const mockPCoreError = () => ({
  getRestClient: () => ({
    invokeRestApi: () => Promise.reject(new Error('Network error'))
  }),
  getActionsApi: () => ({
    createWork: () => { throw new Error('SDK fallback also failed'); }
  })
});

const withMockPCore = (pcore: any) => (Story: any) => {
  useEffect(() => {
    (window as any).PCore = pcore;
    return () => { delete (window as any).PCore; };
  }, []);
  return <div style={{ width: '360px' }}><Story /></div>;
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const Idle: Story = {
  name: 'Idle — ready to create',
  decorators: [withMockPCore(mockPCoreSuccess())],
  args: {
    heading:       'Service Request',
    description:   'Submit a new service request and start the first assignment immediately.',
    classFilter:   'APP-WORK-SERVICEREQUEST',
    labelCreate:   'Create & Start',
    containerName: 'primary',
    getPConnect:   makePConnect()
  }
};

export const WithHighUrgency: Story = {
  name: 'Created — high urgency assignment',
  decorators: [
    withMockPCore(mockPCoreSuccess({ ID: 'ASSIGN-1!FLOW', name: 'Risk Assessment', urgency: 75, type: 'Worklist' }))
  ],
  args: {
    heading:       'Complaint',
    classFilter:   'APP-WORK-COMPLAINT',
    labelCreate:   'Create & Start',
    containerName: 'primary',
    getPConnect:   makePConnect()
  }
};

export const NoAssignment: Story = {
  name: 'Created — no assignment returned',
  decorators: [
    withMockPCore({
      getRestClient: () => ({
        invokeRestApi: () =>
          Promise.resolve({
            data: {
              ID: 'APP-WORK-102',
              data: { caseInfo: { ID: 'APP-WORK-102', status: 'New', caseTypeName: 'Enquiry', assignments: [] } }
            }
          })
      })
    })
  ],
  args: {
    heading:     'Enquiry',
    classFilter: 'APP-WORK-ENQUIRY',
    getPConnect: makePConnect()
  }
};

export const ErrorState: Story = {
  name: 'Error — creation failed',
  decorators: [withMockPCore(mockPCoreError())],
  args: {
    heading:     'Service Request',
    classFilter: 'APP-WORK-SERVICEREQUEST',
    getPConnect: makePConnect()
  }
};

export const NoClassFilter: Story = {
  name: 'Misconfigured — no case type set',
  decorators: [withMockPCore(mockPCoreSuccess())],
  args: {
    heading:     'Service Request',
    classFilter: '',
    getPConnect: makePConnect()
  }
};
