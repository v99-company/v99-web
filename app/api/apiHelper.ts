import {jwtVerify } from 'jose';

export async function verifyToken(token: string): Promise<boolean> {
    try {
      const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
      await jwtVerify(token, JWT_SECRET);
      return true; // Token is valid
    } catch (err) {
      console.error('JWT verification failed:', err);
      return false; // Token verification failed
    }
}