export declare function usePaginate(): {
    getInitialPaginatedRecords: (totalRecords: any, matchPosition: string) => any;
    fetchData: (searchText: string, onScroll: boolean, columns?: never[]) => any;
    resetIndexes: () => void;
    hasMoreResults: (searchText: string) => boolean;
};
export declare function useDeepMemo(memoFn: any, key: any): any;
export declare function useIsMount(): boolean;
export declare const updatePropertiesForNewRecord: (dataConfig: any, contextName: any, dataApiObj: any, setDataApiObj: any, displayFieldMeta: any, c11nEnv: any, columns: Array<any>, actions: any, newCaseId: string) => void;
//# sourceMappingURL=utils.d.ts.map