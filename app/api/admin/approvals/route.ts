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
    const response = await fetch(`${baseUrl}/get_unapproved_clients.php`);
    
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