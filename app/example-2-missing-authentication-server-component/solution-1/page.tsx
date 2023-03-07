import { cookies } from 'next/headers';
import { getPublishedBlogPostsBySessionToken } from '../../../database/blogPosts';
import Common from '../common';

export const dynamic = 'force-dynamic';

export default async function MissingAuthenticationServerComponentPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    return <Common error="Session token not provided" />;
  }

  const blogPosts = await getPublishedBlogPostsBySessionToken(sessionToken);

  if (blogPosts.length < 1) {
    return <Common error="Session token not valid (or no blog posts found)" />;
  }

  return <Common blogPosts={blogPosts} />;
}
