import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ?? initialValue;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
