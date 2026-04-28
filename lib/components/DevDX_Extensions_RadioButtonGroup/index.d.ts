/// <reference types="react" />
import type { PConnFieldProps } from './PConnProps';
import './create-nonce';
interface RadioButtonGroupProps extends PConnFieldProps {
    /** Comma-separated options. Format: "Label" or "key:Label" e.g. "Y:Yes,N:No" */
    optionsList?: string;
    hasSuggestions?: boolean;
    variant?: any;
}
export declare const DevDXExtensionsRadioButtonGroup: (props: RadioButtonGroupProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: (props: RadioButtonGroupProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map