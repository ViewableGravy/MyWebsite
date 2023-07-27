import React from "react";

export const useSocket = (path: string) => {
  const [socket, setSocket] = React.useState<null | WebSocket>(null);

  React.useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:3002${path}`);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [path]);

  return socket;
};