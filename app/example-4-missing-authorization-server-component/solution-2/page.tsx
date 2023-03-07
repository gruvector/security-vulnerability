import { cookies } from 'next/headers';
import { getUnpublishedBlogPostsByUserId } from '../../../database/blogPosts';
import { getUserByValidSessionToken } from '../../../database/users';
import Common from '../common';

export default async function MissingAuthorizationServerComponentPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  if (!sessionToken) {
    return <Common error="Session token not provided" />;
  }

  const user = await getUserByValidSessionToken(sessionToken.value);

  if (!user) {
    return <Common error="Session token not valid" />;
  }

  const blogPosts = await getUnpublishedBlogPostsByUserId(user.id);

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
