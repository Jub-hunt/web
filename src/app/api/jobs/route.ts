import { NextResponse } from "next/server";
import supabase from "@/lib/db";

// API Handler to fetch job data with pagination and full-text search
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1 if not provided
  const searchQuery = url.searchParams.get("search"); // Get search query from the URL
  const lastJobId = parseInt(url.searchParams.get("lastJobId") || "0", 10); // Track the last job ID to fetch new jobs only
  const limit = 10; // Number of jobs per page

  try {
    // Start building the query to fetch data with pagination
    let query = supabase.from("jobs").select().limit(limit);

    // Apply the search query if provided
    if (searchQuery) {
      query = query.textSearch('title', `'${searchQuery}'`);
    }

    // Apply pagination filter based on lastJobId to avoid fetching the same jobs again
    if (lastJobId > 0) {
      query = query.gt('id', lastJobId); // Fetch jobs with id greater than the last one fetched
    }

    // Get the data from the database
    const { data, error, count } = await query.order("id", { ascending: true });

    if (error) {
      throw error;
    }

    // Check if there are more jobs available for pagination
    const hasMore = data.length === limit;

    // Return the response with the fetched data, and pagination info
    return NextResponse.json(
      {
        success: true,
        data,
        page,
        hasMore,
        totalCount: count || data.length, // Return total count for pagination if needed
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
