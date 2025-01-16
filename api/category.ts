import { EntityId, Post } from "../shared/types";
import { config } from "./config";

export async function fetchPosts(categoryId: EntityId): Promise<Post[]> {
  const url = `${config.baseUrl}/categories/${categoryId}`;
  const res = await fetch(url);

  if (res.status !== 200) {
    throw new Error(
      `Failed to fetch category with id ${categoryId}, status: ${res.status}`,
    );
  }

  const data = (await res.json()) as Post[];
  return data;
}
