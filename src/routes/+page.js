import { getPosts } from "$lib/blog.js";

export async function load() {
  const posts = await getPosts();
  return { posts };
}
