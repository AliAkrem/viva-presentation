import getUsers from "@/lib/getUsers";
import { NextResponse } from "next/server";



// GET 
export async function GET() {

  const users = await getUsers();

  return NextResponse.json({ users : users });

}

// POST 





// PUT 
// DELETE 