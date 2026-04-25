import { PConnect } from '@pega/pcore-pconnect-typedefs';

export interface PConnProps {
  getPConnect: () => typeof PConnect;
}

export interface PConnFieldProps extends PConnProps {
  label: string;
  required: boolean;
  disabled: boolean;
  value: any;
  validatemessage: string;
  status?: string;
  readOnly: boolean;
  testId: string;
  helperText: string;
  displayMode?: string;
  hideLabel: boolean;
}
