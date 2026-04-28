import { PConnect } from '@pega/pcore-pconnect-typedefs';

export interface PConnProps {
  getPConnect: () => typeof PConnect;
}

export interface PConnLayoutProps extends PConnProps {
  label?: string;
  children?: any[];
  readOnly?: boolean;
  displayMode?: string;
}
