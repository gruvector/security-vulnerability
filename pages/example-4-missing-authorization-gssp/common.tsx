import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { BlogPost } from '../../database/blogPosts';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export function CommonContent() {
  return (
    <>
      <h1>Missing Authorization - getServerSideProps</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/vulnerable-1">
            Vulnerable 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/vulnerable-2">
            Vulnerable 2
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-gssp/solution-2">
            Solution 2
          </LinkIfNotCurrent>
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
    </>
  );
}

export default function Common(props: Props) {
  return (
    <div>
      <CommonContent />

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
