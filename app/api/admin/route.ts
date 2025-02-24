import { API_BASE_URL } from "@/app/utils/strings";
import { NextResponse } from "next/server";
import { verifyToken } from "../apiHelper";

const baseUrl = API_BASE_URL + '/api';

// Helper function to decode the JWT token and extract the apiToken
function getApiToken(token: string | null): string | null {
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

// GET route to fetch the admin list
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const isValid = await verifyToken(token);

    if (!isValid) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    // Extract the apiToken from the JWT token
    const apiToken = getApiToken(token);
    if (!apiToken) {
      return NextResponse.json({ message: "API token not found" }, { status: 401 });
    }

    // Fetch the admin list
    const response = await fetch(`${baseUrl}/admin/get_admins_list.php`, {
      method: 'GET',
      headers: {
        Authorization: apiToken, // Include the apiToken in the headers
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Admin list not found", status: response.status }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT route to update an admin
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const isValid = await verifyToken(token);

    if (!isValid) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 401 });
    }

    // Extract the apiToken from the JWT token
    const apiToken = getApiToken(token);
    if (!apiToken) {
      return NextResponse.json({ message: "API token not found" }, { status: 401 });
    }

    // Parse the request body
    const { id, name, username, role, blocked } = await req.json();

    if (!id || !name || !username || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Update the admin
    const response = await fetch(`${baseUrl}/admin/update_admin.php`, {
      method: 'PUT',
      headers: {
        Authorization: apiToken, // Include the apiToken in the headers
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, username, role, blocked }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to update admin", status: response.status }, { status: 400 });
    }

    const data = await response.json();
    return NextResponse.json({ message: "Admin updated successfully", data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}