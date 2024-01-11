/// <reference types="react" />
type PathExceptions = {
  [key: string]: string;
};
interface BackNavigationProps {
  backButtonTitle: string;
  pathExceptions: PathExceptions;
}
export declare const BackNavigation: ({ backButtonTitle, pathExceptions }: BackNavigationProps) => JSX.Element | null;
export {};
