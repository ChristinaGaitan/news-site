import { EntityId } from "../../shared/types";
import { config } from "../config";
import { Comment } from "../../shared/types";

export async function fetchComments(postId: EntityId): Promise<Comment[]> {
  const res = await fetch(`${config.baseUrl}/comments/${postId}`);

  return await res.json();
}
