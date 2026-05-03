import { PConnect } from '@pega/pcore-pconnect-typedefs';

export interface PConnProps {
  getPConnect: () => typeof PConnect;
}
