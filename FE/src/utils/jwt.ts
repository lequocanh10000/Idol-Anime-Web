export type JwtPayload = {
  id?: number;
  roleId?: number;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

function base64UrlDecode(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  // atob is available in browsers
  return atob(padded);
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const json = base64UrlDecode(parts[1]);
    const payload = JSON.parse(json) as JwtPayload;
    return payload && typeof payload === 'object' ? payload : null;
  } catch {
    return null;
  }
}
