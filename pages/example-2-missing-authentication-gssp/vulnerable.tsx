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

export async function getServerSideProps() {
  const blogPosts = await getPublishedBlogPosts();
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
