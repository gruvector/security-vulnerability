import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props = {
  error: string | undefined;
  blogPosts: BlogPost[];
};

export default function Common(props: Props) {
  return (
    <div>
      <h1>Missing Authentication - API Route</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-api-route/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-1-missing-authentication-api-route/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-api-route/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-1-missing-authentication-api-route/solution-1.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-1-missing-authentication-api-route/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-1-missing-authentication-api-route/solution-2.ts
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

      {props.error && <div style={{ color: 'red' }}>{props.error}</div>}

      {props.blogPosts.map((blogPost) => {
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
