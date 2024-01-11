import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function EditNoteIcon(props: SvgIconProps) {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21V18.875L17.3 13.575L19.425 15.7L14.125 21H12ZM3 16V14H10V16H3ZM20.125 15L18 12.875L18.725 12.15C18.9083 11.9667 19.1417 11.875 19.425 11.875C19.7083 11.875 19.9417 11.9667 20.125 12.15L20.85 12.875C21.0333 13.0583 21.125 13.2917 21.125 13.575C21.125 13.8583 21.0333 14.0917 20.85 14.275L20.125 15ZM3 12V10H14V12H3ZM3 8V6H14V8H3Z"
        fill="evenodd"
      />
    </SvgIcon>
  );
}
