import { PConnect } from '@pega/pcore-pconnect-typedefs';

// PConnProps.d.ts
export interface PConnProps {
  getPConnect: () => typeof PConnect;
}

// Layout-specific props
export interface PConnLayoutProps extends PConnProps {
  label?: string;
  layoutMode?: 'TWO_COLUMN' | 'THREE_COLUMN' | 'SINGLE_COLUMN';
  columnGap?: string;
  rowGap?: string;
  columnWidth?: string;
  children?: any[];
  getPConnect: () => typeof PConnect;
  readOnly?: boolean;
  displayMode?: string;
}
