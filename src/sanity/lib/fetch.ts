import { client } from "./client";


export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>; // Specific type for params
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from Sanity");
  }
}