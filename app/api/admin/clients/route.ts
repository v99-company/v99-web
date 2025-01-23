import { API_BASE_URL } from "@/app/utils/strings";

import {NextResponse } from "next/server"
import { verifyToken } from "../../apiHelper";


const baseUrl = API_BASE_URL+'/api/admin'

export async function GET(req:Request){

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

    const { searchParams } = new URL(req.url);
    const limit = searchParams.has('limit') ? searchParams.get('limit') : 100
    const response = await fetch(`${baseUrl}/get_all_clients.php?limit=${limit}`);
    
    if(!response.ok){
      return NextResponse.json({message:'clients list not found'}, {status:404})
    }
    const data = await response.json()
    // console.log("Clients Data in API: ", data.data);
    return NextResponse.json({data:data.data},{status:200})
  } catch (error: any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}

export async function POST (req:Request){
  try {
    const payload = await req.json();
    console.log("Received payload:", payload);

    const response = await fetch(`${baseUrl}/add_client.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log("Response ", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from add client service:", errorText);
        return NextResponse.json({ message: 'client failed to be added' }, { status: 404 });
    }

    const data = await response.json();
    console.log("Data from add client service:", data);
    return NextResponse.json({ data: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}

export async function PUT (req:Request){
  try {
    const payload = await req.json();
    console.log("Received PUT payload:", payload);

    const response = await fetch(`${baseUrl}/update_client.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    console.log("Response ", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from update client service:", errorText);
        return NextResponse.json({ message: 'client failed to be updated' }, { status: 404 });
    }

    const data = await response.json();
    console.log("Data from updated client service:", data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}