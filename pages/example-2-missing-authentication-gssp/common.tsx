import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function Common(props: Props) {
  return (
    <div>
      <h1>Missing Authentication - getServerSideProps</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-gssp/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-gssp/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-2-missing-authentication-gssp/solution-2">
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
    </div>
  );
}
