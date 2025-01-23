import { verifyToken } from "@/app/api/apiHelper";
import { API_BASE_URL } from "@/app/utils/strings";

import {NextRequest, NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api'

export async function GET(req:NextRequest){
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
  

    const pathParts = req.nextUrl.pathname.split('/');
    const id = pathParts.pop();
    console.log("received id ", id);
    const response = await fetch(`${baseUrl}/fetch_single_client.php?id=${id}`);
    
    if(!response.ok){
      return NextResponse.json({message:'client not found'}, {status:404})
    }
    const data = await response.json()
   console.log("Client Data in API: ", data.data);
    
    return NextResponse.json({data:data.data},{status:200})
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}


export async function DELETE(req:NextRequest){
  console.log("Client delete invoked");

try {
  const pathParts = req.nextUrl.pathname.split('/');
  const id = pathParts.pop();
  console.log("received id ", id);
  const response = await fetch(`${baseUrl}/delete_single_client.php?id=${id}`);
  
  if(!response.ok){
    return NextResponse.json({message:'client not found'}, {status:404})
  }
  const data = await response.json()
 console.log("Client Data in API: ", data.data);
  
  return NextResponse.json({data:data.data},{status:200})
} catch (error) {
  return NextResponse.json({error:error},{status:500})
}
}