import { NextResponse } from "next/server";
import supabase from "@/lib/db";

//req is short for request
export async function GET(req) {
  const { data, error } = await supabase.from("jobs").select(limit(count = 12));
  return NextResponse.json({ message: data }, { status: 200 });
}

export async function POST(req) {
  return NextResponse.json(
    { message: "This is a post request" },
    { status: 200 }
  );
}

export async function PATCH(req) {
  return NextResponse.json(
    { message: "This is a patch request" },
    { status: 200 }
  );
}
