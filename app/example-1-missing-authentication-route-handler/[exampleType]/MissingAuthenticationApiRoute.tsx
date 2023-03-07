'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../database/blogPosts';
import { MissingAuthenticationApiRouteResponseBodyGet } from '../../api/example-1-missing-authentication-route-handler/solution-1/route';
import LinkIfNotCurrent from '../../LinkIfNotCurrent';

type Props = {
  exampleType: string;
};

export default function MissingAuthenticationApiRoute(props: Props) {
  const [error, setError] = useState<string>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  if (
    !props.exampleType ||
    !/^(vulnerable|solution-\d)$/.test(props.exampleType)
  ) {
    notFound();
  }

  useEffect(() => {
    async function fetchInitialData() {
      const response = await fetch(
        `/api/example-1-missing-authentication-route-handler/${props.exampleType}`,
      );

      const data: MissingAuthenticationApiRouteResponseBodyGet =
        await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }

      setError(undefined);
      setBlogPosts(data.blogPosts);
    }

    fetchInitialData().catch(() => {});
  }, [props.exampleType]);

  return (
    <>
      <h1>Missing Authentication - Route Handler</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-route-handler/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            app/api/example-1-missing-authentication-route-handler/vulnerable/route.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-route-handler/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            app/api/example-1-missing-authentication-route-handler/solution-1/route.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-route-handler/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            app/api/example-1-missing-authentication-route-handler/solution-2/route.ts
          </code>
        </li>
      </ul>

      <hr />

      <div>
        The following blog posts should only be visible for logged-in users.
        <br />
        <br />
        If a user is not logged in, an error message should appear.
      </div>

      <h2>Blog Posts</h2>

      {!!error && <div style={{ color: 'red' }}>{error}</div>}

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
