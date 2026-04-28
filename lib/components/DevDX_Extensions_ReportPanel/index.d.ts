/// <reference types="react" />
import type { PConnProps } from './PConnProps';
import './create-nonce';
interface ReportPanelProps extends PConnProps {
    heading?: string;
    dataPageName?: string;
    stat1Label?: string;
    stat1Value?: string;
    stat1Color?: string;
    stat2Label?: string;
    stat2Value?: string;
    stat2Color?: string;
    stat3Label?: string;
    stat3Value?: string;
    stat3Color?: string;
}
declare function DevDXExtensionsReportPanel(props: ReportPanelProps): import("react/jsx-runtime").JSX.Element;
declare const _default: (props: ReportPanelProps) => JSX.Element;
export default _default;
export { DevDXExtensionsReportPanel };
//# sourceMappingURL=index.d.ts.map