/// <reference types="react" />
import type { PConnProps } from './PConnProps';
type Variant = 'primary' | 'secondary' | 'simple';
type Size = 'default' | 'compact';
interface DataTransformButtonProps extends PConnProps {
    /** Button label */
    label?: string;
    /** Name of the Pega Data Transform to invoke on click */
    dataTransformName?: string;
    /** Visual style of the button */
    variant?: Variant;
    /** Button size */
    size?: Size;
    /** Label shown while the data transform is running */
    labelLoading?: string;
    /** Message shown on success (auto-clears after 4 s) */
    labelSuccess?: string;
    /** Whether to show inline success/error feedback */
    showFeedback?: boolean | string;
}
declare function DevDXExtensionsDataTransformButton(props: DataTransformButtonProps): import("react/jsx-runtime").JSX.Element;
declare const _default: (props: DataTransformButtonProps) => JSX.Element;
export default _default;
export { DevDXExtensionsDataTransformButton };
//# sourceMappingURL=index.d.ts.map