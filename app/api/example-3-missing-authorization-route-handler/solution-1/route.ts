import { NextRequest, NextResponse } from 'next/server';
import {
  BlogPost,
  getUnpublishedBlogPostsBySessionToken,
} from '../../../../database/blogPosts';

export const dynamic = 'force-dynamic';

export type MissingAuthorizationApiRouteResponseBodyGet =
  | { error: string }
  | { blogPosts: BlogPost[] };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MissingAuthorizationApiRouteResponseBodyGet>> {
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        error: 'Session token not provided',
      },
      {
        status: 401,
      },
    );
  }

  const blogPosts = await getUnpublishedBlogPostsBySessionToken(sessionToken);

  if (blogPosts.length < 1) {
    return NextResponse.json(
      {
        error: 'Session token not valid (or no blog posts found)',
      },
      {
        status: 403,
      },
    );
  }

  return NextResponse.json({
    blogPosts: blogPosts,
  });
}
