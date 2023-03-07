import { BlogPost } from '../../database/blogPosts';
import LinkIfNotCurrent from '../LinkIfNotCurrent';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function Common(props: Props) {
  return (
    <>
      <h1>Missing Authentication - Server Component</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-server-component/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-server-component/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-server-component/solution-2">
            Solution 2
          </LinkIfNotCurrent>
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

      {'error' in props && <div style={{ color: 'red' }}>{props.error}</div>}

      {'blogPosts' in props &&
        props.blogPosts.map((blogPost) => {
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
