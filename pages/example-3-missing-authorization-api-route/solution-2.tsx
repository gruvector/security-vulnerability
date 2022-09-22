import { useEffect, useState } from 'react';
import { BlogPost } from '../../database/blogPosts';
import Common from './common';

export default function MissingAuthorizationApiRoute() {
  const [error, setError] = useState<string>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      const response = await fetch(
        '/api/example-3-missing-authorization-api-route/solution-2',
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

  return <Common error={error} blogPosts={blogPosts} />;
}
