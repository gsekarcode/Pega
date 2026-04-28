import type { Meta, StoryObj } from '@storybook/react';
import { DevDXExtensionsPaginatedTable } from './index';
import { mockColumns, mockRows, mockPConnect } from './mock';

const meta: Meta<typeof DevDXExtensionsPaginatedTable> = {
  title: 'Components/DevDX_Extensions_PaginatedTable',
  component: DevDXExtensionsPaginatedTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

const columnsJson = JSON.stringify(mockColumns);
const dataJson    = JSON.stringify(mockRows);

// Default — zebra on, 10 rows per page
export const Default: Story = {
  args: {
    title:             'Employee List',
    columnsJson,
    dataJson,
    pageSize:          10,
    showPageSizeSelector: true,
    zebra:             true,
    hoverHighlight:    true,
    getPConnect:       () => mockPConnect as any
  }
};

// Zebra off
export const NoZebra: Story = {
  args: {
    ...Default.args,
    title:  'No Zebra Striping',
    zebra:  false
  }
};

// Small page size
export const FivePerPage: Story = {
  args: {
    ...Default.args,
    title:    '5 Rows Per Page',
    pageSize: 5
  }
};

// Page size selector hidden
export const FixedPageSize: Story = {
  args: {
    ...Default.args,
    title:                'Fixed Page Size (no selector)',
    showPageSizeSelector: false,
    pageSize:             20
  }
};

// Empty state
export const Empty: Story = {
  args: {
    ...Default.args,
    title:    'Empty Table',
    dataJson: '[]'
  }
};
