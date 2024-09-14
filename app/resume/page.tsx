import { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { format } from 'date-fns'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'
import { getBlocks } from '../../lib/notion'
import { database } from '../../lib/database'
import { renderBlock } from '../../components/notion/renderer'
import styles from '../../styles/post.module.css'

const getCareerData = async () => {
  const data = await database.career.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      CareerChapter: {
        include: {
          CareerSmallChapter: true,
        },
      },
    },
  })
  return data
}

async function queryNotionResumePage() {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume,
  })
  return res
}

export default async function ResumePage() {
  const careerData = await getCareerData()
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
          <div>
            {careerData.map((item, index) => (
              <div
                key={item.company}
                style={{ display: 'flex', marginBottom: '12px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#2D2D2D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p style={{ textAlign: 'center', margin: 'unset' }}>
                      {careerData.length - index}
                    </p>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      width: '1px',
                      background: '#2D2D2D',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  ></div>
                </div>
                <div style={{ width: '100%', marginLeft: '12px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    {format(item.startDate, 'yyyy-MM')}
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 'auto',
                      padding: '12px',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow:
                        '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)', // Material Shadow
                      fontSize: '16px',
                      background: '#2D2D2D',
                    }}
                  >
                    <h2>{item.company}</h2>
                    <div>
                      {item.CareerChapter.map((chapter) => (
                        <Fragment key={chapter.id}>
                          <h3>{chapter.title}</h3>
                          <ul>
                            {chapter.CareerSmallChapter.map((smallChapter) => (
                              <li key={smallChapter.id}>
                                {smallChapter.description}
                              </li>
                            ))}
                          </ul>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  )
}
