/// <reference types="react" />
import type { PConnLayoutProps } from './PConnProps';
interface CollapsibleLayoutProps extends PConnLayoutProps {
    heading?: string;
    headerBackground?: string;
    /** Whether the section can be collapsed by the user */
    collapsible?: boolean | string;
    /** Default visual state when collapsible is enabled: "expanded" | "collapsed" */
    defaultBehaviour?: 'expanded' | 'collapsed';
    children?: any[];
}
declare const _default: (props: CollapsibleLayoutProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map