export const mockPConnect = (onUpdate?: (val: boolean) => void) => () => ({
  getStateProps: () => ({ value: '.IsConfirmed' }),
  getActionsApi: () => ({
    updateFieldValue: (_prop: string, val: boolean) => onUpdate?.(val),
    triggerFieldChange: (_prop: string, _val: boolean) => { /* nothing */ }
  })
});
