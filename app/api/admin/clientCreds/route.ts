import { API_BASE_URL } from "@/app/utils/strings";
import { NextResponse } from "next/server";
import { getApiToken, verifyToken } from "../../apiHelper";

const baseUrl = API_BASE_URL + '/api';


// GET route to fetch the freelancer list
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

    // Fetch the clientCred list
    const response = await fetch(`${baseUrl}/admin/get_client_logins_list.php`, {
      method: 'GET',
      headers: {
        Authorization: apiToken, // Include the apiToken in the headers
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Client Creds list not found", status: response.status }, { status: 404 });
    }

    const data = await response.json();
    return NextResponse.json(data , { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT route to update an Client Creds
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

    // Update the Client Creds
    const response = await fetch(`${baseUrl}/admin/update_client_login.php?id=${id}`, {
      method: 'PUT',
      headers: {
        Authorization: apiToken, // Include the apiToken in the headers
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, role, blocked }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to update Client Creds", status: response.status }, { status: 400 });
    }

    const data = await response.json();
    return NextResponse.json({ message: "Client Creds updated successfully", data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST route to update an freelancer
export async function POST(req: Request): Promise<NextResponse> {
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
    const payload = await req.json();

    console.log("Received payload:", payload);

    // Update the freelancer
    const response = await fetch(`${baseUrl}/admin/add_client_login.php`, {
      method: 'PUT',
      headers: {
        Authorization: apiToken, // Include the apiToken in the headers
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Response:", response);
    console.log("Data:", data);

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to add Client Cred", status: response.status }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}