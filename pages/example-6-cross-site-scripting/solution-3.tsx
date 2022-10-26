import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import ReactMarkdown from 'react-markdown';
import { BlogPost, getBlogPostById } from '../../database/blogPosts';
import { CommonContent } from './common';

type Props =
  | {
      error: string;
    }
  | {
      blogPost: BlogPost;
    };

export default function CrossSiteScripting(props: Props) {
  return (
    <div>
      <CommonContent {...props} />
      {'blogPost' in props && (
        <>
          <h2>{props.blogPost.title}</h2>
          <div>Published: {String(props.blogPost.isPublished)}</div>

          {/*
            Markdown alone is not safe by default. Many Markdown
            libraries will also support full usage of HTML tags,
            which opens up XSS attack vectors:
            https://www.markdownguide.org/basic-syntax/#html

            react-markdown is safe against XSS by default:
            https://github.com/remarkjs/react-markdown#security

            If you decide to use a different Markdown library,
            make sure that it is secure or you enable any
            configuration options to make it secure
          */}
          <ReactMarkdown children={props.blogPost.textContent} />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Different blog post text_content including Markdown
  const blogPost = await getBlogPostById(7);

  if (!blogPost) {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Blog post not found',
      },
    };
  }

  return {
    props: {
      blogPost: blogPost,
    },
  };
}
