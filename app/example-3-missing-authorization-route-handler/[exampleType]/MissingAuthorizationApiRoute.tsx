'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../database/blogPosts';
import { MissingAuthorizationApiRouteResponseBodyGet } from '../../api/example-3-missing-authorization-route-handler/solution-1/route';
import LinkIfNotCurrent from '../../LinkIfNotCurrent';

type Props = {
  exampleType: string;
};

export default function MissingAuthorizationApiRoute(props: Props) {
  const [error, setError] = useState<string>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  if (
    !props.exampleType ||
    !/^(vulnerable-1|solution-\d)$/.test(props.exampleType)
  ) {
    notFound();
  }

  useEffect(() => {
    async function fetchInitialData() {
      const response = await fetch(
        `/api/example-3-missing-authorization-route-handler/${props.exampleType}`,
      );

      const data: MissingAuthorizationApiRouteResponseBodyGet =
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
      <h1>Missing Authorization - Route Handler</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-route-handler/vulnerable-1">
            Vulnerable 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-route-handler/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-route-handler/vulnerable-2">
            Vulnerable 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-route-handler/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-route-handler/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-route-handler/solution-1.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-route-handler/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-route-handler/solution-2.ts
          </code>
        </li>
      </ul>

      <hr />

      <div>
        Below, a list of unpublished blog posts will appear for logged-in users
        - similar to a "Drafts" list in a CMS.
        <br />
        <br />
        Each unpublished blog post should only be visible for the owner of the
        post.
      </div>

      <h2>Unpublished Blog Posts</h2>

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
