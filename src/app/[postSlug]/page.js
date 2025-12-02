
import BlogHero from '@/components/blog/BlogHero';

import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug)
  return {
    title: frontmatter.title,
    description: frontmatter.abstract
  }
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug)
  return (
    <article className={styles.wrapper}>
      <BlogHero
        {...frontmatter} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
