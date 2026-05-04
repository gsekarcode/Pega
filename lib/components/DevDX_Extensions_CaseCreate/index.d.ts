import './create-nonce';
interface CaseCreateProps {
    getPConnect: any;
    heading?: string;
    description?: string;
    /** pyClassName of the case type to create */
    classFilter: string;
    labelCreate?: string;
    autoCreate?: boolean | string;
}
declare function DevDXExtensionsCaseCreate(props: CaseCreateProps): import("react/jsx-runtime").JSX.Element;
declare const _default: (props: CaseCreateProps) => JSX.Element;
export default _default;
export { DevDXExtensionsCaseCreate };
//# sourceMappingURL=index.d.ts.map