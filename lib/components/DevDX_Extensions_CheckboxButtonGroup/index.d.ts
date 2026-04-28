/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface CheckboxButtonGroupProps extends PConnFieldProps {
    /** Comma-separated options. Format: "Label" or "key:Label" e.g. "R:Red,G:Green,B:Blue" */
    optionsList?: string;
    hasSuggestions?: boolean;
    variant?: any;
}
export declare const DevDXExtensionsCheckboxButtonGroup: (props: CheckboxButtonGroupProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: (props: CheckboxButtonGroupProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map