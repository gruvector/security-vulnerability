import { GetServerSidePropsResult } from 'next';
import { BlogPost, getPublishedBlogPosts } from '../../database/blogPosts';
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

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const blogPosts = await getPublishedBlogPosts();
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
