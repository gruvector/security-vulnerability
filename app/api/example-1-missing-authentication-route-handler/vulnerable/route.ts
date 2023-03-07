import { NextResponse } from 'next/server';
import {
  BlogPost,
  getPublishedBlogPosts,
} from '../../../../database/blogPosts';

export type MissingAuthenticationApiRouteResponseBodyGet = {
  blogPosts: BlogPost[];
};

export async function GET(): Promise<
  NextResponse<MissingAuthenticationApiRouteResponseBodyGet>
> {
  const blogPosts = await getPublishedBlogPosts();

  return NextResponse.json({
    blogPosts: blogPosts,
  });
}
