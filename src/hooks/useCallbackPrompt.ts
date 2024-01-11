import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBlocker } from './useBlocker';

export function useCallbackPrompt(condition: boolean, allowedPath?: string[]) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = () => {
    setShowPrompt(false);
  };

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      // allowed redirect path
      if (
        allowedPath &&
        (allowedPath.includes(nextLocation.location.pathname) ||
          allowedPath.some((path) => nextLocation.location.pathname?.includes(path)))
      ) {
        setLastLocation(nextLocation);
        setConfirmedNavigation(true);
        return false;
      }
      // in if condition we are checking next location and current location are equals or not
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location],
  );

  const confirmNavigation = () => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  };

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // @ts-ignore
      navigate(lastLocation.location.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, condition);

  return { showPrompt, confirmNavigation, cancelNavigation };
}
