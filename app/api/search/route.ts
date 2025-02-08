import { API_BASE_URL } from "@/app/utils/strings";
import { NextResponse } from "next/server";

const baseUrl = API_BASE_URL + '/api';

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('query'); // Get the search term from the query params
    
    if (!search) {
      return NextResponse.json({ message: 'Search term is required' }, { status: 400 });
    }

    const response = await fetch(`${baseUrl}/search_clients.php?search=${search}`);

    console.log("Search Response ", response);

    if (!response.ok) {
      return NextResponse.json({ message: 'No clients found' }, { status: 404 });
    }

    const data = await response.json();
    console.log("Search Data in API: ", data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}
