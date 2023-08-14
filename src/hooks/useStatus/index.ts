import useWebSocket, { ReadyState } from 'react-use-websocket';

const server = process.env.REACT_APP_BACKEND_SERVER || "localhost";
const port = process.env.REACT_APP_BACKEND_PORT || "3002";
const wsapi = `ws://${server}:${port}`;
const path = 'api/status';

export const useStatus = () => {
  const { lastMessage, readyState } = useWebSocket(`${wsapi}/${path}`, {
    shouldReconnect: () => true,
  });
  const { data } = lastMessage || {};
  const isLoading = readyState !== ReadyState.OPEN || !data;

  return {
    data: parseStatus(data),
    isLoading
  } as const;
}

const parseStatus = (status?: string) => {
  if (!status) return null;

  try {
    return JSON.parse(status);
  } catch (error) {
    return { error };
  }
}