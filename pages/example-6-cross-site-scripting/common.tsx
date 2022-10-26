import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props =
  | {
      error: string;
    }
  | {
      blogPost: BlogPost;
    };

export function CommonContent(props: Props) {
  return (
    <>
      <h1>Cross-Site Scripting (XSS)</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-6-cross-site-scripting/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-cross-site-scripting/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-cross-site-scripting/solution-2">
            Solution 2
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-6-cross-site-scripting/solution-3">
            Solution 3
          </LinkIfNotCurrent>
        </li>
      </ul>

      <hr />

      <div>
        The following blog post should not cause any arbitrary JavaScript to
        run.
      </div>

      <h2>Blog Post</h2>

      {'error' in props && <div style={{ color: 'red' }}>{props.error}</div>}
    </>
  );
}

// Export component for Next.js page build
export default function Common() {
  return null;
}
