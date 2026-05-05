/// <reference types="react" />
import './create-nonce';
interface CaseCreateProps {
    heading?: string;
    description?: string;
    /** pyClassName of the case type to create */
    classFilter: string;
    labelCreate?: string;
    /** View to open after creation (default: pyDetails) */
    viewName?: string;
    /** Container to open the case in (default: modal) */
    containerName?: string;
    autoCreate?: boolean | string;
}
declare function DevDXExtensionsCaseCreate(props: CaseCreateProps): import("react/jsx-runtime").JSX.Element;
declare const _default: (props: CaseCreateProps) => JSX.Element;
export default _default;
export { DevDXExtensionsCaseCreate };
//# sourceMappingURL=index.d.ts.map