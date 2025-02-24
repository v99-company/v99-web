import { API_BASE_URL } from "@/app/utils/strings";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = API_BASE_URL+'/api/admin'


// GET: Fetch all business requests
export async function GET() {
    try {
      const response = await fetch(`${baseUrl}/get_business_requests.php`);
      const data = await response.json();
  
      if (!response.ok) {
        return NextResponse.json({ message: "Failed to fetch business requests" }, { status: response.status });
      }
  
      return NextResponse.json({ message: "Success", data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  } 

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.businessName || !data.contactPerson || !data.contactNumber || !data.address || !data.description) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    console.log("New Business Submission:", data);

    
    const externalResponse = await fetch(`${baseUrl}/add_business_request.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const externalData = await externalResponse.json();
  
      if (!externalResponse.ok) {
        return NextResponse.json({ message: externalData.message || "Failed to add business" }, { status: externalResponse.status });
      }

    return NextResponse.json({ message: "Business request added successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


// PUT: Update business request status
export async function PUT(req: NextRequest) {
    try {
      const data = await req.json();
      console.log("Received data:", data);
      if (!data.business_request_id || !data.status || !data.updated_by) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
  
      const response = await fetch(`${baseUrl}/update_business_request_status.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        return NextResponse.json({ message: "Failed to update status" }, { status: response.status });
      }
      
      const text = await response.text();
      console.log("Result text:", text);
      
  
      return NextResponse.json({ message: "Business request updated successfully!", data: text }, { status: 200 });
    } catch (error) {
      console.log("Error:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  
  // DELETE: Delete a business request
  export async function DELETE(req: NextRequest) {
    try {
      const data = await req.json();
      console.log("Received data:", data);
      if (!data.business_request_id || !data.deleted_by) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
  
      const response = await fetch(`${baseUrl}/delete_business_request.php`, {
        method: "PUT", // The DELETE action is done using PUT in the external API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return NextResponse.json({ message: result.message || "Failed to delete request" }, { status: response.status });
      }
  
      return NextResponse.json({ message: "Business request deleted successfully!", data: result }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    }