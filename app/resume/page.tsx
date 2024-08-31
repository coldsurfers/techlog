import { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'
import { getBlocks } from '../../lib/notion'
import { renderBlock } from '../../components/notion/renderer'
import styles from '../../styles/post.module.css'

async function queryNotionResumePage() {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume,
  })
  return res
}

export default async function ResumePage() {
  const resumeResult = await queryNotionResumePage()
  const { results } = resumeResult
  const page = results.at(0)
  if (!page) {
    return null
  }
  const blocks = await getBlocks(page.id)

  return (
    <div>
      <Head>
        {/* @ts-ignore */}
        <title>{page.properties.Title?.title[0].plain_text}</title>
      </Head>
      <article className={styles.container}>
        <section>
          {blocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  )
}
