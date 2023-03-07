import { cookies } from 'next/headers';
import { getPublishedBlogPosts } from '../../../database/blogPosts';
import { getUserByValidSessionToken } from '../../../database/users';
import Common from '../common';

export const dynamic = 'force-dynamic';

export default async function MissingAuthenticationServerComponentPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    return <Common error="Session token not provided" />;
  }

  const user = await getUserByValidSessionToken(sessionToken);

  if (!user) {
    return <Common error="Session token not valid" />;
  }

  const blogPosts = await getPublishedBlogPosts();

  return <Common blogPosts={blogPosts} />;
}
