import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const getUser = async (username: string, password: string) => {
  const apiUrl = 'https://backend.v99.in/api/admin/freelancer_login.php';


  // Make a POST request to the external API
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  // Parse the JSON response
  const data = await response.json();
  console.log("Response data:", data);
  // const text = await response.text();
  // console.log("Response text:", text);
  // Check if the login was successful
  if (data.status === "success") {
    return { user: data.user }; // Return both user data and token
  } else {
    console.error("Login failed:", data.message);
    throw new Error(data.message); // Throw an error if login fails
  }
};

// Login endpoint
export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    // Fetch user data and token from the external API
    const { user} = await getUser(username, password);

    console.log("User:", user);

    // Create JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
    const jwtPayload = {
      ...user,
      // role: 'freelancer'
    };

    const jwtToken = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3d') // Token expires in 3 days
      .sign(secret);

    // Return both the JWT token and the API token in the response
    return NextResponse.json(
      { message: 'Freelancer Login successful', token: jwtToken },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Freelancer Login error:", error);
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}