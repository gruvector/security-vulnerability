import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props = {
  error: string | undefined;
  blogPosts?: BlogPost[];
};

export default function Common(props: Props) {
  return (
    <div>
      <h1>Missing Authorization - API Route</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-api-route/vulnerable-1">
            Vulnerable 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-api-route/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-api-route/vulnerable-2">
            Vulnerable 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-api-route/vulnerable.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-api-route/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-api-route/solution-1.ts
          </code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-3-missing-authorization-api-route/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>
            pages/api/example-3-missing-authorization-api-route/solution-2.ts
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

      {!!props.error && <div style={{ color: 'red' }}>{props.error}</div>}

      {props.blogPosts?.map((blogPost) => {
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
