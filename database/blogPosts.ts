import { cache } from 'react';
import { sql } from './connect';

export type BlogPost = {
  id: number;
  title: string;
  textContent: string;
  isPublished: boolean;
  userId: number;
};

export const getBlogPosts = cache(async () => {
  const blogPosts = await sql<BlogPost[]>`
    SELECT * FROM blog_posts
  `;
  return blogPosts;
});

export const getBlogPostById = cache(async (id: number) => {
  const [blogPost] = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      id = ${id}
  `;
  return blogPost;
});

export const getPublishedBlogPosts = cache(async () => {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      is_published = true
  `;
  return blogPosts;
});

export const getPublishedBlogPostsBySessionToken = cache(
  async (sessionToken: string) => {
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
  },
);

export const getUnpublishedBlogPosts = cache(async () => {
  const blogPosts = await sql<BlogPost[]>`
    SELECT
      *
    FROM
      blog_posts
    WHERE
      is_published = false
  `;
  return blogPosts;
});

export const getUnpublishedBlogPostsBySessionToken = cache(
  async (sessionToken: string) => {
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
  },
);

export const getUnpublishedBlogPostsByUserId = cache(async (userId: number) => {
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
});

export const getBlogPostsBySessionToken = cache(
  async (sessionToken: string) => {
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
  },
);
