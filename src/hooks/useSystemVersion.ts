import { selectSystemModuleBuildVersions, selectUser } from '@store';
import { useEffect, useState } from 'react';
import { SystemModuleName } from '@enums';
import md5 from 'md5';

export const useSystemVersion = () => {
  const user = selectUser();
  const moduleBuildVersions = selectSystemModuleBuildVersions();
  const [hashVersion, setHashVersion] = useState('');
  const [mainVersion, setMainVersion] = useState('');
  const [buildVersion, setBuildVersion] = useState('');

  useEffect(() => {
    const hashParts: string[] = [];

    const [hostModuleVersion, hostModuleBuildVersion] = moduleBuildVersions[SystemModuleName.Host]?.split('-') || [];

    if (hostModuleVersion) {
      setMainVersion(hostModuleVersion);
      hashParts.push(hostModuleVersion);
    }

    if (hostModuleBuildVersion) {
      setBuildVersion(hostModuleBuildVersion);
    }

    if (user.currentOrganizationId) {
      hashParts.push(user.currentOrganizationId);
    }

    if (user.currentBranchId) {
      hashParts.push(user.currentBranchId);
    }

    setHashVersion(md5(hashParts.join('')));
  }, [user, APP_VERSION, moduleBuildVersions]);

  return {
    mainVersion,
    buildVersion,
    hashVersion,
  };
};
