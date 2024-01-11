import { PropsWithChildren, useEffect, useState } from 'react';

type RemoteModuleGuardProps = PropsWithChildren<{
  dependencies: any[];
  condition: (dependencies: any[]) => boolean;
}>;

export const RemoteModuleGuard = ({ children, dependencies, condition }: RemoteModuleGuardProps) => {
  const [moduleIsReady, setModuleIsReady] = useState(false);

  useEffect(() => {
    setModuleIsReady(condition(dependencies));
  }, [...dependencies]);

  return <>{moduleIsReady ? children : null}</>;
};
