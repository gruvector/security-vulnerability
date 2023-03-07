import { cookies } from 'next/headers';
import { getUnpublishedBlogPostsBySessionToken } from '../../../database/blogPosts';
import Common from '../common';

export const dynamic = 'force-dynamic';

export default async function MissingAuthorizationServerComponentPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  if (!sessionToken) {
    return <Common error="Session token not provided" />;
  }

  const blogPosts = await getUnpublishedBlogPostsBySessionToken(
    sessionToken.value,
  );

  return (
    <>
      <Common />

      {blogPosts.map((blogPost) => {
        return (
          <div key={`blog-post-${blogPost.id}`}>
            <h2>{blogPost.title}</h2>
            <div>Published: {String(blogPost.isPublished)}</div>
            <div>{blogPost.textContent}</div>
          </div>
        );
      })}
    </>
  );
}
