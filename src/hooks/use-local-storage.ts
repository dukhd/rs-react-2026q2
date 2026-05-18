import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    const stored = localStorage.getItem(key);

    return stored ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
