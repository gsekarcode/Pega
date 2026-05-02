import './create-nonce';
export type CaseLauncherProps = {
    /** Card heading */
    heading: string;
    /** Description shown on the card */
    description?: string;
    /** Class name of the case type to create (pyClassName from D_pyQuickCreate) */
    classFilter: string;
    /** Label for the create button */
    labelPrimaryButton: string;
    /** When true, the case is created automatically when the widget mounts */
    autoLaunch?: boolean | string;
    /** Container to open the case in: modal, primary, or workarea */
    containerName?: 'modal' | 'primary' | 'workarea';
    getPConnect: any;
};
export declare const DevDXExtensionsCaseLauncher: (props: CaseLauncherProps) => import("react/jsx-runtime").JSX.Element;
declare const _default: (props: CaseLauncherProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map