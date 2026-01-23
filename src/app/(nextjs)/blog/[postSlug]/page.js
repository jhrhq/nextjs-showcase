import { MDXRemote } from "next-mdx-remote/rsc";
import BlogHero from "@/components/blog/BlogHero";
import { loadBlogPost } from "@/helpers/file-helpers";
import MDX_CMPONENTS from "@/helpers/mdx-components";
import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero {...frontmatter} />
      <div className={styles.page}>
        <MDXRemote source={content} components={MDX_CMPONENTS} />
      </div>
    </article>
  );
}

export default BlogPost;
