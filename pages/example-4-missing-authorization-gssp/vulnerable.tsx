import { BlogPost, getUnpublishedBlogPosts } from '../../database/blogPosts';
import Common from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPosts: BlogPost[];
    };

export default function MissingAuthentication(props: Props) {
  return <Common {...props} />;
}

export async function getServerSideProps() {
  const blogPosts = await getUnpublishedBlogPosts();
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
