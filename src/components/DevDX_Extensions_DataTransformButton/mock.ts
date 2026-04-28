export const mockPConnect = () => ({
  getContextName: () => 'app/primary_1',
  getCaseSummary: () => ({ content: { caseID: 'MOCK-APP-WORK M-1001' } }),
  getActionsApi: () => ({
    invoke: () => new Promise<void>(resolve => { setTimeout(resolve, 1200); })
  })
});
