import { CustomButtonSeverity } from './custom-button-severity.type';

export interface CustomButtonConfig {
  label?: string;
  raised?: boolean;
  severity?: CustomButtonSeverity;
  icon?: string;
  rounded?: boolean;
  outlined?: boolean;
  styleClass?: string;
  disabled?: boolean;
  text?: boolean;
  link?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
