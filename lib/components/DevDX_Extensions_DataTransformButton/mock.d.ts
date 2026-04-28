export declare const mockPConnect: () => {
    getContextName: () => string;
    getCaseSummary: () => {
        content: {
            caseID: string;
        };
    };
    getActionsApi: () => {
        invoke: () => Promise<void>;
    };
};
//# sourceMappingURL=mock.d.ts.map