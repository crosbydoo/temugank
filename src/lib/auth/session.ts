import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'temugank_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export interface SessionPayload {
  email: string
  role: 'admin'
}

function secretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret)
}

export async function signSession(
  payload: SessionPayload,
  secret: string,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey(secret))
}

export async function verifySessionToken(
  token: string,
  secret: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(secret))
    if (typeof payload.email !== 'string' || payload.role !== 'admin') return null
    return { email: payload.email, role: 'admin' }
  } catch {
    return null
  }
}

export function sessionCookieOptions(secure: boolean) {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure,
    maxAge: MAX_AGE_SECONDS,
  }
}

export { COOKIE_NAME }

export function verifyAdminCredentials(
  email: string,
  password: string,
  adminEmail: string,
  adminPassword: string,
): boolean {
  return email === adminEmail && password === adminPassword
}
