import DOMPurify from 'dompurify';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { BlogPost, getBlogPostById } from '../../database/blogPosts';
import { CommonContent } from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPost: BlogPost;
    };

export default function CrossSiteScripting(props: Props) {
  return (
    <div>
      <CommonContent {...props} />

      {'blogPost' in props && (
        <>
          <h2>{props.blogPost.title}</h2>
          <div>Published: {String(props.blogPost.isPublished)}</div>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.blogPost.textContent),
            }}
          />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const blogPost = await getBlogPostById(6);

  if (!blogPost) {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Blog post not found',
      },
    };
  }

  return {
    props: {
      blogPost: blogPost,
    },
  };
}
