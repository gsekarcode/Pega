/// <reference types="react" />
import type { PConnProps } from './PConnProps';
import './create-nonce';
interface ScreenFlowFormProps extends PConnProps {
    heading?: string;
    /** Comma-separated list of step names, e.g. "Personal Info,Contact Details,Review,Submit" */
    stepLabels?: string;
    /** 1-based index of the current step */
    currentStep?: number | string;
    showStepProgress?: boolean | string;
    showNavigationButtons?: boolean | string;
    labelPrevious?: string;
    labelNext?: string;
    labelSubmit?: string;
    children?: any;
}
export declare const DevDXExtensionsScreenFlowForm: (props: ScreenFlowFormProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: (props: ScreenFlowFormProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map