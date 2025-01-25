import { API_BASE_URL } from "@/app/utils/strings";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../apiHelper";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 404 });
    }
  
    const token = authHeader.split(" ")[1];
  
    const isValid = await verifyToken(token);
  
    if (!isValid) {
      return NextResponse.json({ message: "Authentication failed" }, { status: 404 });
    }

    const formData = await req.formData();

    // Create a new FormData to send to the remote API
    const uploadFormData = new FormData();
    let hasFiles = false;

    // Extract all files and append them to uploadFormData
    for (const [key, value] of formData.entries()) {
      if (value instanceof Blob) { // Use Blob instead of File
        uploadFormData.append(key, value);
        hasFiles = true;
      }
    }

    if (!hasFiles) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const response = await fetch(`${API_BASE_URL}/api/file_upload.php`, {
      method: "POST",
      headers: {
        accept: "*/*",
      },
      body: uploadFormData,
    });

    console.log("Response: ", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data); // Return the remote API response to the client
  } catch (error: any) {
    console.error("Error uploading files:", error);
    return NextResponse.json({ error: `File upload failed: ${error.message}` }, { status: 500 });
  }
}
