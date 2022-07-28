import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../database/blogPosts';

export default function MissingAuthentication() {
  const [error, setError] = useState<string>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      const response = await fetch(
        '/api/api-1-missing-authentication/vulnerable',
      );
      const data = await response.json();
      if ('error' in data) {
        setError(data.error);
        return;
      }
      setError(undefined);
      setBlogPosts(data.blogPosts);
    }

    fetchInitialData().catch(() => {});
  }, []);

  return (
    <div>
      <h1>Missing Authentication</h1>

      <ul>
        <li>
          <Link href="/page-1-missing-authentication/vulnerable">
            Vulnerable
          </Link>{' '}
          - API code:
          <code>pages/api/api-1-missing-authentication/vulnerable.ts</code>
        </li>
        <li>
          <Link href="/page-1-missing-authentication/solution-1">
            Solution 1
          </Link>{' '}
          - API code:{' '}
          <code>pages/api/api-1-missing-authentication/solution-1.ts</code>
        </li>
        <li>
          <Link href="/page-1-missing-authentication/solution-2">
            Solution 2
          </Link>{' '}
          - API code:{' '}
          <code>pages/api/api-1-missing-authentication/solution-2.ts</code>
        </li>
      </ul>

      <hr />

      {error && <div>{error}</div>}

      {blogPosts.map((blogPost) => {
        return (
          <div key={`blog-post-${blogPost.id}`}>
            <h2>{blogPost.title}</h2>
            <div>Published: {String(blogPost.isPublished)}</div>
            <div>{blogPost.textContent}</div>
          </div>
        );
      })}
    </div>
  );
}
