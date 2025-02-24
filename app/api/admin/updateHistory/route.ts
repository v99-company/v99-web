import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/app/utils/strings";

const baseUrl = `${API_BASE_URL}/api/admin`;

// GET: Fetch update history
export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/get_update_histories.php`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to fetch update history" }, { status: response.status });
    }

    return NextResponse.json({ status: "success", data: data.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
