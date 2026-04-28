export const mockCollapsibleProps = {
  getPConnect: () => ({
    getInheritedProps: () => ({})
  }),
  heading: 'Section',
  collapsible: false,
  defaultBehaviour: 'expanded' as const,
  children: []
};
