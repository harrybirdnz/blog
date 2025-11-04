import { getPost } from "$lib/blog.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const post = await getPost(params.slug);
    return { post };
  } catch (e) {
    throw error(404, "Post not found");
  }
}
