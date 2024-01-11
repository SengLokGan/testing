import { PropsWithChildren } from 'react';
type RemoteModuleGuardProps = PropsWithChildren<{
  dependencies: any[];
  condition: (dependencies: any[]) => boolean;
}>;
export declare const RemoteModuleGuard: ({ children, dependencies, condition }: RemoteModuleGuardProps) => JSX.Element;
export {};
