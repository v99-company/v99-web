import {NextResponse } from "next/server"

export async function GET(req:Request){

  try {
    const response = await fetch(`https://backend.v99.in/api/get_all_ids.php`);
    
    if(!response.ok){
      return NextResponse.json({message:'clients ids not found'}, {status:404})
    }
    const data = await response.json()
    return NextResponse.json({data:data},{status:200})
  } catch (error: any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}