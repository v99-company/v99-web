import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const getUser = async (username: string, password: string) => {
  const apiUrl = 'https://backend.v99.in/api/admin/login.php';
  
  // Make a POST request to the external API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }).toString(),
  });

  // Parse the JSON response
  const data = await response.json();

  // Check if the login was successful
  if (data.status === "success") {
    return data.user; // Return user data if login is successful
  } else {
    throw new Error(data.message); // Throw an error if login fails
  }
};

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const user = await getUser(username, password);
    
    console.log("User:", user);

    // Create JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-256-bit-secret');
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3d') // Token expires in 3 days
      .sign(secret);

    return NextResponse.json({ message: 'Login successful', token, user }, { status: 200 });
    
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
