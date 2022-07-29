import { NextApiRequest, NextApiResponse } from 'next';
import { getPublishedBlogPostsBySessionToken } from '../../../database/blogPosts';

export default async function missingAuthenticationHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const sessionToken = request.cookies.sessionToken;

  if (!sessionToken) {
    response.status(401).json({
      error: 'Session token not provided',
    });
    return;
  }

  const blogPosts = await getPublishedBlogPostsBySessionToken(sessionToken);

  response.status(200).json({
    blogPosts: blogPosts,
  });
}
