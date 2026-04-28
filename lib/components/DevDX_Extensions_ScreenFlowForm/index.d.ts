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
    /** Bind to a property or condition — when true the Next/Submit button is disabled */
    disableNext?: boolean | string;
    /** Show the header region (above step progress) */
    showHeader?: boolean | string;
    /** Show the footer region (below navigation buttons) */
    showFooter?: boolean | string;
    /** children[0]=Header region, children[1]=Fields region, children[2]=Footer region */
    children?: any[];
}
export declare const DevDXExtensionsScreenFlowForm: (props: ScreenFlowFormProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: (props: ScreenFlowFormProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map