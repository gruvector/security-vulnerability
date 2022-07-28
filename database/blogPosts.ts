import { sql } from './connect';

export type BlogPost = {
  id: number;
  title: string;
  textContent: string;
  isPublished: boolean;
  userId: number;
};

export async function getBlogPosts() {
  const blogPosts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts
  `;
  return blogPosts;
}

export async function getBlogPostsBySessionToken(sessionToken: string) {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      blog_posts.*
    FROM
      blog_posts
    LEFT JOIN
      sessions ON (
        sessions.token = ${sessionToken} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      -- Show all published blog posts
      blog_posts.is_published = true OR
      -- Show unpublished blog posts belonging to user
      sessions.user_id = blog_posts.user_id
  `;
  return blogPosts;
}
