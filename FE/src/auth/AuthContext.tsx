import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as authApi from '../api/auth.ts';
import { decodeJwtPayload } from '../utils/jwt.ts';
import { clearAccessToken, getAccessToken, setAccessToken } from '../utils/storage.ts';

type AuthState = {
  accessToken: string | null;
  roleId: number | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: authApi.LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setToken] = useState<string | null>(() => getAccessToken());
  const [roleId, setRoleId] = useState<number | null>(() => {
    const token = getAccessToken();
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    return typeof payload?.roleId === 'number' ? payload.roleId : null;
  });

  const login = useCallback(async (payload: authApi.LoginRequest) => {
    const result = await authApi.login(payload);
    setAccessToken(result.accessToken);
    setToken(result.accessToken);

    const jwtPayload = decodeJwtPayload(result.accessToken);
    setRoleId(typeof jwtPayload?.roleId === 'number' ? jwtPayload.roleId : null);
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    setToken(null);
    setRoleId(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      roleId,
      isAuthenticated: Boolean(accessToken),
      isAdmin: roleId === 1,
      login,
      logout,
    }),
    [accessToken, roleId, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
