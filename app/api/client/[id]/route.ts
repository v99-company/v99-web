import { API_BASE_URL } from "@/app/utils/strings";

import {NextRequest, NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api'

export async function GET(req:NextRequest){
  try {
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