export const mockPConnect = () => ({
  getContextName: () => 'app/primary_1',
  getActionsApi: () => ({
    runDataTransform: (_name: string, _ctx: string) =>
      new Promise<void>(resolve => setTimeout(resolve, 1200))
  })
});
