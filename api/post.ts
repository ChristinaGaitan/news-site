import fetch from "node-fetch";
import { EntityId, Post } from "../shared/types";
import { config } from "./config";

export async function fetchPost(id: EntityId): Promise<Post> {
  const res = await fetch(`${config.baseUrl}/posts/${id}`);

  if (res.status !== 200) {
    throw new Error(
      `Failed to fetch post with id ${id}, status: ${res.status}`,
    );
  }

  const data = (await res.json()) as Post;
  return data;
}
