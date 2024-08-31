import Link from 'next/link'
import Text from '../components/text'
import styles from './index.module.css'
import { queryNotionBlogTechArticles } from '../lib/utils'

export default async function Page() {
  const posts = await queryNotionBlogTechArticles()
  return (
    <div>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>TechLog</h1>
          <h2>Creative, Attractive and flexible</h2>
          <p>{`Simple Tech Blog. Thanks for the visiting`}</p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => (
            <li key={post.id} className={styles.post}>
              <h3 className={styles.postTitle}>
                <Link href={`/article/${post.slug}`}>
                  <Text title={post.title} />
                </Link>
              </h3>

              <p className={styles.postDescription}>{post.dateLocale}</p>
              <Link href={`/article/${post.slug}`}>Read post →</Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
