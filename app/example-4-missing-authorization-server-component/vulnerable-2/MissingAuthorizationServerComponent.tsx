'use client';

import { BlogPost } from '../../../database/blogPosts';
import { User } from '../../../database/users';

type Props = {
  blogPosts: BlogPost[];
  user: User | undefined;
};

export default function MissingAuthorizationServerComponent(props: Props) {
  return (
    <div>
      {props.blogPosts
        // Filter to blog posts owned by the user
        // Vulnerability fixed?
        .filter((blogPost) => {
          return blogPost.userId === props.user?.id;
        })
        .map((blogPost) => {
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
