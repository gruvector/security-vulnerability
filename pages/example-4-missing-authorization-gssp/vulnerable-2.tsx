import { GetServerSidePropsResult } from 'next';
import { BlogPost, getUnpublishedBlogPosts } from '../../database/blogPosts';
import { User } from '../../database/users';
import { CommonContent } from './common';

type Props =
  | {
      error: string;
      userObject: User | undefined;
    }
  | {
      blogPosts: BlogPost[];
      userObject: User | undefined;
    };

export default function MissingAuthorizationGssp(props: Props) {
  return (
    <div>
      <CommonContent {...props} />

      {'blogPosts' in props &&
        props.blogPosts.map((blogPost) => {
          return (
            // Filter to blog posts owned by the user
            // Vulnerability fixed?
            blogPost.userId === props.userObject?.id && (
              <div key={`blog-post-${blogPost.id}`}>
                <h2>{blogPost.title}</h2>
                <div>Published: {String(blogPost.isPublished)}</div>
                <div>{blogPost.textContent}</div>
              </div>
            )
          );
        })}
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Omit<Props, 'userObject'>>
> {
  const blogPosts = await getUnpublishedBlogPosts();
  return {
    props: {
      blogPosts: blogPosts,
    },
  };
}
