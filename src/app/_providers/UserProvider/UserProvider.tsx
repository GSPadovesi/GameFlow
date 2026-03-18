'use client'

import { createContext, useEffect, useState } from "react";

interface UserProps {
  id: string,
  userName: string,
  userFullName?: string,
  email: string,
  coverURL?: string,
  userGames: any[]

}

interface UserProviderValue {
  user: UserProps,
  loading: boolean,
  error: boolean
}

interface UserProviderProps {
  children: React.ReactNode;
};


export const UserContext = createContext<UserProviderValue | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    userName: '',
    userFullName: '',
    email: '',
    coverURL: '',
    userGames: []

  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Erro ao buscar usuário');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
}