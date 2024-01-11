/// <reference types="react" />
import { WithSx } from '@types';
export type HdReadingEditModalProps = WithSx<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: number;
}>;
export declare const HdReadingEditModal: ({ isOpen, onClose, id, sx }: HdReadingEditModalProps) => JSX.Element;
export default HdReadingEditModal;
