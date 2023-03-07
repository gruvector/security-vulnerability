import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getBlogPostById } from '../../../database/blogPosts';
import Common from '../common';

export default async function CrossSiteScriptingPage() {
  const blogPost = await getBlogPostById(7);

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <Common />

      <h2>{blogPost.title}</h2>
      <div>Published: {String(blogPost.isPublished)}</div>

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
      <ReactMarkdown children={blogPost.textContent} />
    </>
  );
}
