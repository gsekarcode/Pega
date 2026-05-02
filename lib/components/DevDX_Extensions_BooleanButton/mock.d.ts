export declare const mockPConnect: (onUpdate?: ((val: boolean) => void) | undefined) => () => {
    getStateProps: () => {
        value: string;
    };
    getActionsApi: () => {
        updateFieldValue: (_prop: string, val: boolean) => void | undefined;
        triggerFieldChange: () => void;
    };
};
//# sourceMappingURL=mock.d.ts.map