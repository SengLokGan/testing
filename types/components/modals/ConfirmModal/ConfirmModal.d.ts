/// <reference types="react" />
import { WithSx } from '@types';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import type { ButtonProps } from '@mui/material/Button';
export type ConfirmModalProps = WithSx<{
  isOpen: boolean;
  title: string;
  text?: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  onClose: () => void;
  confirmButton: Pick<ButtonProps, 'onClick' | 'children' | 'variant'>;
  cancelButton?: Pick<ButtonProps, 'onClick' | 'children' | 'variant'>;
  dataTestId?: string;
  disableEnforceFocus?: boolean;
}>;
export declare const ConfirmModal: ({
  disableEnforceFocus,
  isOpen,
  title,
  text,
  icon: Icon,
  onClose,
  confirmButton,
  cancelButton,
  sx,
  dataTestId,
}: ConfirmModalProps) => JSX.Element;
export default ConfirmModal;
