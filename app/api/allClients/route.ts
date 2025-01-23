import { API_BASE_URL } from "@/app/utils/strings";

import {NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api'

export async function GET(req:Request){

  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.has('page') ? searchParams.get('page') : 1
    const response = await fetch(`${baseUrl}/get_all_clients.php?page=${page}`);
    
    if(!response.ok){
      return NextResponse.json({message:'clients list not found'}, {status:404})
    }
    const data = await response.json()
   
    
    return NextResponse.json({data:data},{status:200})
  } catch (error: any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}