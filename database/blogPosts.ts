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

export async function getBlogPostById(id: number) {
  const [blogPost] = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      id = ${id}
  `;
  return blogPost;
}

export async function getPublishedBlogPosts() {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      is_published = true
  `;
  return blogPosts;
}

export async function getPublishedBlogPostsBySessionToken(
  sessionToken: string,
) {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      blog_posts.*
    FROM
      blog_posts
    INNER JOIN
      sessions ON (
        sessions.token = ${sessionToken} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      is_published = true
  `;
  return blogPosts;
}

export async function getUnpublishedBlogPosts() {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      is_published = false
  `;
  return blogPosts;
}

export async function getUnpublishedBlogPostsBySessionToken(
  sessionToken: string,
) {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      blog_posts.*
    FROM
      blog_posts
    INNER JOIN
      sessions ON (
        sessions.token = ${sessionToken} AND
        sessions.expiry_timestamp > now() AND
        sessions.user_id = blog_posts.user_id
      )
    WHERE
      is_published = false
  `;
  return blogPosts;
}

export async function getUnpublishedBlogPostsByUserId(userId: number) {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      is_published = false AND
      user_id = ${userId}
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
      sessions.user_id = blog_posts.user_id
  `;
  return blogPosts;
}
