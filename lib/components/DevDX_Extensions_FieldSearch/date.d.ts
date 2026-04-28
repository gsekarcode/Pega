export declare const COSMOS_FORMAT_CONSTANTS: {
    SHORT: string;
    LONG: string;
};
export declare const COSMOS_VARIANT_CONSTANTS: {
    DATE_TIME: string;
    DATE: string;
    RELATIVE: string;
    TIME: string;
};
export declare const DATE_TYPES: {
    DATE: string;
    DATE_TIME: string;
    TIME: string;
};
export declare function format(value: any, options: any): string | null;
declare const _default: {
    'DateTime-Long': (value: any, options: any) => string | null;
    'DateTime-Short': (value: any, options: any) => string | null;
    'DateTime-Since': (value: any, options: any) => string | null;
    'Time-Only': (value: any, options: any) => string | null;
    convertToTimezone: (value: any, options: any) => any;
    convertFromTimezone: (value: any, timezone: any) => any;
    Date: (value: any, options: any) => any;
    'Date-Default': (value: any, options: any) => string | null;
    'Date-Time-Default': (value: any, options: any) => string | null;
    'Time-Default': (value: any, options: any) => string | null;
};
export default _default;
//# sourceMappingURL=date.d.ts.map