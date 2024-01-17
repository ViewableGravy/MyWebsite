import useWebSocket, { ReadyState } from 'react-use-websocket';

const server = import.meta.env.VITE_APP_BACKEND_SERVER || "localhost";
const port = import.meta.env.VITE_APP_BACKEND_PORT || "3002";
const protocol = import.meta.env.VITE_APP_WEBSOCKET_PROTOCOL || 'wss';
const wsapi = `${protocol}://${server}:${port}`;
const path = 'api/status';

export const useStatus = () => {
  const { lastMessage, readyState } = useWebSocket(`${wsapi}/${path}`, {
    shouldReconnect: () => true,
  });
  const { data } = lastMessage || {};
  const isLoading = readyState !== ReadyState.OPEN || !data;

  return {
    data: safeParse(data),
    isLoading
  } as const;
}

export const safeParse = <T, >(data?: string) => {
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    return { error };
  }
}