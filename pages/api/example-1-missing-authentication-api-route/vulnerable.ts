import { NextApiRequest, NextApiResponse } from 'next';
import { getPublishedBlogPosts } from '../../../database/blogPosts';

export default async function missingAuthenticationHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const blogPosts = await getPublishedBlogPosts();
  response.status(200).json({
    blogPosts: blogPosts,
  });
}
