import { GetServerSidePropsContext } from 'next';
import {
  BlogPost,
  getUnpublishedBlogPostsByUserId,
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

export default function MissingAuthorizationGssp(props: Props) {
  return <Common {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
