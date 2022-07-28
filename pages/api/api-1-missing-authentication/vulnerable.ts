import { NextApiRequest, NextApiResponse } from 'next';
import { getBlogPosts } from '../../../database/blogPosts';

export default async function missingAuthenticationHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const blogPosts = await getBlogPosts();
  response.status(200).json({
    blogPosts: blogPosts,
  });
}
