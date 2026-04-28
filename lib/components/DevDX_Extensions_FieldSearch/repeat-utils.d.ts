export declare const SIMPLE_TABLE_MANUAL_READONLY = "SimpleTableManualReadOnly";
export declare const PAGE = "!P!";
export declare const PAGELIST = "!PL!";
/** Date-functions supported by the Data-views API */
export declare const defaultDateFunctions: {
    DATE_TIME: string[];
    DATE_ONLY: string[];
};
export declare function getMappedKey(key: any): any;
export declare function launchLocalAction(getPConnect: any, rowContext: any, action: any, cb: any): void;
export declare function launchBulkAction(getPConnect: any, selectedList: any, action: any, caseTypeID: any, cb: any): void;
export declare function updateWithTimeZone(stateFromTable: any, meta: any): any;
export declare function isHybrid(): boolean;
export declare const isPageListInPath: (propertyName: any, currentClassID: any) => any;
export declare const isEmbeddedField: (field: any) => boolean;
export declare const getFieldListFromFilter: (filterExpression: any) => any[];
export declare function isGroupingAdded(state: any): any;
export declare function getDataViewParameters(parameters: any, runtimeParams: any): {};
export declare function generateKeyFromCompositeKeys(compositeKeys: any, rowData: any): string;
export declare function getLookUpDataPageInfo(classID: any): {
    lookUpDatePage: any;
    lookUpDataPageInfo: any;
};
export declare function isAlternateKeyStorageForLookUp(lookUpDataPageInfo: any): boolean;
export declare const isSelfReferencedProperty: (param: any, referenceProp: any) => boolean;
export declare function getDescriptorsFieldName(property: any, pageClass: any): any;
export declare function preparePatchQueryFields(fields: any, isDataObject: boolean | undefined, classID: string | undefined, getPConnect: any): any[];
export declare function prepareFilters(keys?: never[], data?: {}, logicOperator?: string): {
    logic: string;
    filterConditions: {};
} | null;
export declare function prepareAdditionalApiParams({ useExtendedTimeout, includeTotalCount }?: {
    useExtendedTimeout: any;
    includeTotalCount: any;
}): {};
export declare function getLabelsForTimeoutModal(tableState: any): {
    heading: string;
    description: string;
    submitButtonLabel: string;
    cancelButtonLabel: string;
};
export declare function getAssociationFieldsFromQuery(query: any): any;
export declare function mergeAssociationFieldsAggregations(meta: any, stateFromTable: any, select: any, existingAggregations: any): void;
export declare function filterDuplicatesBy(id: any): (obj: any) => boolean;
export declare function isOpenViewInModal(additionalDetails: any): any;
/**
 *
 * @param {Object} promotedFiltersObject
 * @returns An array of conditions formed with the promoted filters
 *
 * example:
 * promotedFiltersObject = {a:2, b: 3};
 * return
 * [
    condition: {
      comp: 'EQ',
        lhs: {field: 'a'},
        rhs: {value: '2'}
      },
      condition: {
        comp: 'EQ',
        lhs: {field: 'b'},
        rhs: {value: '3'}
      }
    ]
*/
export declare function formatPromotedFiltersAsFilterConditions(promotedFiltersObject?: {}): never[];
/**
 * @param {Object} state
 * @param {Object} meta
 * @returns Copy of states with virtualizer indexes
 */
export declare function updatePaginationStatesForMultipleCalls(state: any, meta: any): any[];
/**
 * @param {Object} state
 * @param {Object} meta
 * @param {Array} requests
 * @returns Resolves promise, compiles and slices the data
 */
export declare function processRequests(state: any, meta: any, requests: any): Promise<{
    data: any[];
    queryStats: any;
    count: undefined;
}>;
export declare function getLeafValue(data: any, fieldName: any, fieldSeparator: any): any;
export declare const buildAggOrCalcId: (columnId: any, functionName: any) => string;
//# sourceMappingURL=repeat-utils.d.ts.map