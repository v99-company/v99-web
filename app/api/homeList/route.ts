import { API_BASE_URL } from "@/app/utils/strings";

import {NextResponse } from "next/server"


const baseUrl = API_BASE_URL+'/api'

export async function GET(){

  try {
    const response = await fetch(`${baseUrl}/get_home_list.php`);
    if(!response.ok){
      return NextResponse.json({message:'custom home clients list not found'}, {status:404})
    }
    const data = await response.json()
       
    return NextResponse.json({data:data},{status:200})
  } catch (error: any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}

export async function PUT (req:Request){
  try {
    const payload = await req.json();
    console.log("Received PUT payload:", payload);

    const list = payload.priorities
    console.log("Received list:", list);

    const response = await fetch(`${baseUrl}/admin/update_home_list.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
    });

    console.log("Response ", response.status);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from update client custom listing:", errorText);
        return NextResponse.json({ message: 'client custom listing failed to be updated' }, { status: 404 });
    }

    const data = await response.json();
    console.log("Data from updated client custom listing:", data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}