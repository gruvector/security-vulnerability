'use client';

import { BlogPost } from '../../../database/blogPosts';

type Props = {
  blogPosts: BlogPost[];
};

export default function MissingAuthorizationServerComponent(props: Props) {
  return (
    <div>
      {props.blogPosts.map((blogPost) => {
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
