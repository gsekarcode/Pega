// Mock data for DevDX_Extensions_Layout1 component
export const mockLayoutProps = {
  getPConnect: () => ({
    getInheritedProps: () => ({
      layoutMode: 'TWO_COLUMN',
      columnGap: '16',
      rowGap: '16',
    }),
  }),
  layoutMode: 'TWO_COLUMN' as const,
  columnGap: '16',
  rowGap: '16',
  children: [],
  displayMode: 'NORMAL',
};

export const mockLayoutModes = {
  twoColumn: {
    layoutMode: 'TWO_COLUMN' as const,
  },
  threeColumn: {
    layoutMode: 'THREE_COLUMN' as const,
  },
  singleColumn: {
    layoutMode: 'SINGLE_COLUMN' as const,
  },
};
