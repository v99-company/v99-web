import { getApiToken, verifyToken } from "@/app/api/apiHelper";
import { API_BASE_URL } from "@/app/utils/strings";

import { NextRequest, NextResponse } from "next/server"


const baseUrl = API_BASE_URL + '/api'

export async function PUT(req: NextRequest) {
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
  
    const pathParts = req.nextUrl.pathname.split('/');
    const id = pathParts.pop();

    const payload = await req.json();

    const response = await fetch(`${baseUrl}/admin/update_client_login.php?id=${id}`, {
        method: 'POST',
        headers: {
            Authorization: apiToken, // Include the apiToken in the headers
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log("Response ", response);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from update client cred service:", errorText);
        return NextResponse.json({ message: "Failed to update Client Creds", status: response.status }, { status: 400 });
    }

    const data = await response.json();
    console.log("Data from updated client service:", data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}
