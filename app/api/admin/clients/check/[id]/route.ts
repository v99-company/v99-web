import { verifyToken } from "@/app/api/apiHelper";
import { API_BASE_URL } from "@/app/utils/strings";

import {NextRequest, NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api/admin'

export async function GET(req:NextRequest){
  try {

    const pathParts = req.nextUrl.pathname.split('/');
    const id = pathParts.pop();
    const response = await fetch(`${baseUrl}/check_id.php?id=${id}`);
    
    if(!response.ok){
      return NextResponse.json({message:'id not found'}, {status:404})
    }
    const data = await response.json()
    console.log("Client Data in API: ", data); 
       
    return NextResponse.json({data:data},{status:200})
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}