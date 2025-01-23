import { API_BASE_URL } from "@/app/utils/strings";

import {NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api'

export async function GET(req:Request){
  try {
    const response = await fetch(`${baseUrl}/get_clients_count.php`);

    console.log("Response ", response);
    
    if(!response.ok){
      return NextResponse.json({message:'clients count list not found'}, {status:404})
    }
    const data = await response.json()
    console.log("Clients Data in API: ", data);
       
    return NextResponse.json({data:data},{status:200})
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({error:error.message},{status:500})
  }
}