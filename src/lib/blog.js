/**
 * Blog utilities for loading and managing markdown posts
 */

/**
 * Get all blog posts with their metadata
 * @returns {Promise<Array>} Array of post objects with metadata and slug
 */
export async function getPosts() {
  const postFiles = import.meta.glob("/src/posts/*.md", { eager: true });
  const posts = [];

  for (const path in postFiles) {
    const post = postFiles[path];
    const slug = path.split("/").pop().replace(".md", "");

    // Only include published posts (published defaults to false if not specified)
    const published = post.metadata.published === true;
    if (!published) continue;

    posts.push({
      slug,
      title: post.metadata.title,
      date: post.metadata.date,
      excerpt: post.metadata.excerpt,
      published: post.metadata.published,
    });
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Promise<Object>} Post object with metadata and content
 */
export async function getPost(slug) {
  const post = await import(`../posts/${slug}.md`);

  return {
    slug,
    ...post.metadata,
    content: post.default,
  };
}
