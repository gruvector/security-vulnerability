import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  BlogPost,
  getPublishedBlogPostsBySessionToken,
} from '../../database/blogPosts';
import { getUserByValidSessionToken } from '../../database/users';
import Common from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function MissingAuthenticationGssp(props: Props) {
  return <Common {...props} />;
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

  const blogPosts = await getPublishedBlogPostsBySessionToken(sessionToken);

  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
