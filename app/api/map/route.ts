import { API_BASE_URL } from "@/app/utils/strings";

import {NextResponse } from "next/server"

export async function POST (req:Request){
  try {
    const payload = await req.json();
    console.log("Received payload:", payload);
    const { mapUrl } = payload


    const res = await fetch(mapUrl, {
        redirect: 'follow'
    });
    
    const fullUrl = res.url;

    // https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed

    console.log('Full URL:', fullUrl);

    console.log("Received mapUrl:", mapUrl);

    // Extract coordinates from the full URL
    const urlParts = fullUrl.split('/');
    const coordinatesPart = urlParts[urlParts.length - 1].split('?')[0];
    const [latitude, longitude] = coordinatesPart.split(',').map(coord => coord.trim());

    // Construct the embed URL
    const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    console.log("Embed URL:", embedUrl);
        
    return NextResponse.json({ data: {url:{mapUrl}} }, { status: 200 });

    const response = await fetch(`https/add_client.php`, {
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