import { useSocketEvent } from "./useSocketEvent";

export const useStatus = () => {
  const [status] = useSocketEvent('/api/status');

  const isLoading = !status;
  const data = status ? JSON.parse(status) : null;

  return {
    isLoading,
    data,
  }
}