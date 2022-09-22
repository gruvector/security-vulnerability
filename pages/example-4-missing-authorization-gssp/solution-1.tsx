import { GetServerSidePropsContext } from 'next';
import {
  BlogPost,
  getUnpublishedBlogPostsBySessionToken,
} from '../../database/blogPosts';
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

  const blogPosts = await getUnpublishedBlogPostsBySessionToken(sessionToken);

  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
