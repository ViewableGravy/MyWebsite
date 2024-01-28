import { useRef, useEffect } from 'react';

export const usePrevious = <T, >(value: T, dependencies?: React.DependencyList): T | null => {
  const ref = useRef<T | null>(null);
  const deps = dependencies ?? [];

  useEffect(() => {
    ref.current = value;
  }, [value, ...deps]);
  return ref.current;
};