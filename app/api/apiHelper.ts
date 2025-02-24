import {jwtVerify } from 'jose';

// export async function verifyToken(token: string): Promise<boolean> {
//     try {
//       const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
//       await jwtVerify(token, JWT_SECRET);
//       return true; // Token is valid
//     } catch (err) {
//       console.error('JWT verification failed:', err);
//       return false; // Token verification failed
//     }
// }


export async function verifyToken(token: string): Promise<boolean> {
  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Check if the token is expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.error('Token has expired.');
      return false;
    }

    return true; // Token is valid
  } catch (err) {
    console.error('JWT verification failed:', err);
    return false; // Token is invalid
  }
}

// Helper function to decode the JWT token and extract the apiToken
export function getApiToken(token: string | null): string | null {
  if (!token) {
    return null;
  }
  try {
    // Decode the JWT token
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded Token:", decodedToken);

    // Return the apiToken from the decoded token
    return decodedToken.apiToken || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}