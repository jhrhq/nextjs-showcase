import BlogSummaryCard from '@/components/blog/BlogSummaryCard';
import { getBlogPostList } from '@/helpers/file-helpers';
import styles from './homepage.module.css';

export default async function Page() {
  const blogPosts = await getBlogPostList()

  return <div className={styles.wrapper}>
    <h1 className={styles.mainHeading}>
      Latest Content:
    </h1>

    {blogPosts.map(
      ({ slug, ...delegated }) => <BlogSummaryCard
        key={slug}
        slug={slug}
        {...delegated}
      />
    )
    }
  </div>;
}