/***** BASE IMPORTS *****/
import { useEffect } from 'react';
import { useAtom } from 'jotai/react';

/***** STORE IMPORTS *****/
import { store } from 'store';

/***** UTILITIES *****/
import { useSocketContext } from 'components/socketProvider/own';

/***** HOOK START *****/
export const useStatus = () => {
  /**** HOOKS *****/
  const { send, leave } = useSocketContext();
  const [{ data, status }] = useAtom(store.sockets.serviceStatus);

  /**** EFFECTS *****/
  useEffect(() => {
    send({ event: 'serviceStatus' });

    return () => {
      leave(['serviceStatus']);
    }
  }, []);

  /**** RETURN *****/
  return {
    data,
    isLoading: status !== 'open' || data.length === 0,
  } as const;
}