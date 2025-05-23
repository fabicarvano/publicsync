// src/hooks/useUserInfo.ts
import { useState, useEffect } from 'react';

export function useUserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return { user };
}
