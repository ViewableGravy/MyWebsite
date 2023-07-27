import React from "react";
import { useSocket } from "./useSocket";

//TODO - map socket events to global state and use that instead of returning results
// Also ensure that the socket is closed when the component is unmounted
export const useSocketEvent = (path: string) => {
  const [results, setResults] = React.useState(null);
  const socket = useSocket(path);

  React.useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', (event) => {
      setResults(event.data);
    });

    socket.onclose = () => {
      setResults(null);
    }

    return () => {
      socket.removeEventListener('message', (event) => {
        setResults(event.data);
      });
    }
  }, [socket]);

  return [results];
}