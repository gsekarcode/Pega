import { type MutableRefObject, type SetStateAction } from 'react';
import { type MenuGroupProps, type MenuItemProps } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface DevDxExtensionsFieldSearchProps extends PConnFieldProps {
    isTableFormatter?: boolean;
    hasSuggestions?: boolean;
    formatter: string;
    maxResultsDisplay: string;
    matchPosition: string;
    listType: string;
    parameters: any;
    columns: Array<any>;
    cacheLifeSpan: string;
    createNewRecord: any;
    onRecordChange: any;
    datasourceMetadata: any;
    datasource: Array<any>;
    deferDatasource: boolean;
    additionalProps: any;
    referenceType: string;
    primaryField: string;
    selected: boolean;
    actualValue: any;
    descriptors: any;
    dataRelationshipContext: any;
    contextClass: string;
    isSearchableOnKey: boolean;
}
export declare const preProcessColumns: (columns: Array<any>) => any[];
export declare const getDisplayFieldsMetaData: (columns: Array<any>) => {
    key: string;
    primary: string;
    secondary: never[];
    hidden: never[];
};
export declare const buildColumnForDisplayValue: (dataObj: any) => void;
export declare const doSearch: (searchText: string, displayFieldMeta: {
    key: any;
    primary: any;
    secondary: any;
    hidden: any;
}, dataApiObj: {
    fetchData?: any;
    columns?: any;
    isQueryable?: any;
    matchPosition?: any;
}, setItems: {
    (value: SetStateAction<Array<never>>): void;
    (value: SetStateAction<Array<never>>): void;
    (value: SetStateAction<Array<never>>): void;
    (arg0: Array<MenuItemProps | MenuGroupProps>): void;
}, setLoading: {
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
}, hasMoreResults: MutableRefObject<boolean>, extraProps?: {}) => void;
export declare const setValuesToPropertyList: (selectedItem: any, assocProp: any, item: any, columns: Array<any>, actions: any) => any;
export declare const setValueToAssocProp: (assocProp: any, selectedItem: any, listType: string, listSource: Array<any>, actions: any, columns: Array<any>) => any;
declare const _default: (props: DevDxExtensionsFieldSearchProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map