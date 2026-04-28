export declare const flattenParameters: (parameters?: {}) => {};
export declare const buildColumnForDisplayValue: (dataObj: any) => void;
export declare const extractFieldMetadata: (datasourceMetadata: any) => {
    datasource: any;
    parameters: {};
    columns: ({
        key: string;
        setProperty: string;
        value: any;
        display?: undefined;
        primary?: undefined;
        useForSearch?: undefined;
    } | {
        display: string;
        primary: string;
        useForSearch: boolean;
        value: any;
        key?: undefined;
        setProperty?: undefined;
    })[];
};
export declare const preProcessColumns: (columns: any) => any;
export declare const getDisplayFieldsMetaData: (columns: any) => {
    key: string;
    primary: string;
    secondary: never[];
    hidden: never[];
};
//# sourceMappingURL=picklist-utils.d.ts.map