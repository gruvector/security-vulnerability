import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  BlogPost,
  getUnpublishedBlogPostsByUserId,
} from '../../database/blogPosts';
import { getUserByValidSessionToken } from '../../database/users';
import { CommonContent } from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function MissingAuthorizationGssp(props: Props) {
  return (
    <div>
      <CommonContent {...props} />

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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const sessionToken = context.req.cookies.sessionToken;

  if (!sessionToken) {
    return {
      props: {
        error: 'Session token not provided',
      },
    };
  }

  const user = await getUserByValidSessionToken(sessionToken);

  if (!user) {
    return {
      props: {
        error: 'Session token not valid',
      },
    };
  }

  const blogPosts = await getUnpublishedBlogPostsByUserId(user.id);

  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
