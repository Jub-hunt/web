import { NextResponse } from "next/server";
//req is short for request
export async function GET() {
  return NextResponse.json({ message: [] }, { status: 200 });
}
