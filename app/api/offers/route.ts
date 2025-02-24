import { API_BASE_URL } from "@/app/utils/strings";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = `${API_BASE_URL}/api/admin`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("body", body);
    const response = await fetch(`${BASE_URL}/add_offer.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to add offer");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${BASE_URL}/update_offer.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to update offer");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
