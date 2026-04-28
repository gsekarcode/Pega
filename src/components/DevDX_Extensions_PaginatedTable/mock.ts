export const mockColumns = [
  { key: 'id',         label: 'ID',          align: 'left'  },
  { key: 'name',       label: 'Name',        align: 'left'  },
  { key: 'department', label: 'Department',  align: 'left'  },
  { key: 'status',     label: 'Status',      align: 'center'},
  { key: 'amount',     label: 'Amount',      align: 'right' }
];

export const mockRows = Array.from({ length: 47 }, (_, i) => ({
  id:         i + 1,
  name:       ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee', 'Eva Brown'][i % 5],
  department: ['Engineering', 'Marketing', 'Finance', 'HR', 'Legal'][i % 5],
  status:     ['Active', 'Pending', 'Closed'][i % 3],
  amount:     `$${((i + 1) * 137.5).toFixed(2)}`
}));

export const mockPConnect = {
  getInheritedProps: () => ({}),
  getContextName: () => 'app/primary_1'
};
