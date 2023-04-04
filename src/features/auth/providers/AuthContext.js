import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '~/src/components';
import { ME_QUERY, REFRESH_TOKEN_MUTATION, VERIFY_TOKEN_MUTATION } from '../api';




export const AuthContext = createContext(
  {user,
  setUser}
  
);



export function AuthProvider( {
 
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    // When page is first opened, check for a previously logged in user.
    if (token) {
      initialAuth();
    }
  }, []);

  const initialAuth = () => {
    apolloClient
      .mutate({
        mutation: VERIFY_TOKEN_MUTATION,
        variables: {
          token,
        },
      })
      .then(() => {
        getUser();
      })
      .catch(() => {
        refreshAuthToken();
      });
  };

  const getUser = () => {
    apolloClient
      .query({
        query: ME_QUERY,
      })
      .then((meRes: any) => {
        setUser(meRes.data.me);
      });
  };

  const refreshAuthToken = () => {
    apolloClient
      .mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: {
          refreshToken,
        },
      })
      .then((refreshRes: any) => {
        localStorage.setItem('refreshToken', refreshRes.refreshToken.refreshToken);
        localStorage.setItem('token', refreshRes.refreshToken.token);
        getUser();
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        // This provider is not within a router so must use
        // window location here
        window.location.href = '/login';
      });
  };

  if (token && !user) {
    return (
      <div className="headspace">
        <Spinner message="Loading..." />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export interface TestingAuthProviderProps {
  user?: any;
  children: React.ReactNode;
}

export function TestingAuthProvider(props: TestingAuthProviderProps) {
  const [user, setUser] = useState(props.user ? props.user : null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
