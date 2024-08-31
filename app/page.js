import Link from 'next/link'
import Text from '../components/text'
import styles from './index.module.css'
import notionInstance, { notionDatabaseIds } from '../lib/notionInstance'

async function queryNotionBlogTechArticles() {
  const platformFilter = {
    property: 'platform',
    multi_select: {
      contains: 'techlog',
    },
  }
  const result = await notionInstance.databases.query({
    database_id: notionDatabaseIds.blog,
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    filter: platformFilter,
  })

  // console.log()

  const posts = result.results.map((post) => {
    const createdTime = new Date(post.created_time)
    const lastEditedTime = new Date(post.last_edited_time)
    const slug = post.properties?.Slug?.rich_text?.at(0)?.text.content
    const title = post.properties?.Name?.title
    const postStatus = post.properties.Status.status.name
    return {
      id: post.id,
      createdTime,
      lastEditedTime,
      dateLocale: createdTime.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      slug,
      title,
      status: postStatus,
    }
  })

  return posts.filter((post) => post.status === 'Published')
}

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
