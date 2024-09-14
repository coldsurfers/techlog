import { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { format } from 'date-fns'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'
import { getBlocks } from '../../lib/notion'
import { database } from '../../lib/database'
import { renderBlock } from '../../components/notion/renderer'
import postStyles from '../../styles/post.module.css'
import resumeStyles from './page.module.css'

const getCareerData = async () => {
  const data = await database.career.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      CareerChapter: {
        include: {
          CareerSmallChapter: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  })
  return data
}

async function queryNotionResumePage() {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume ?? '',
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
      <article className={postStyles.container}>
        <section>
          {blocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <div>
            {careerData.map((item, index) => (
              <div
                key={item.company}
                className={resumeStyles.careerItemWrapper}
              >
                <div className={resumeStyles.careerLeft}>
                  <div className={resumeStyles.careerCircle}>
                    <p className={resumeStyles.careerCircleText}>
                      {careerData.length - index}
                    </p>
                  </div>
                  <div className={resumeStyles.careerLeftVerticalLine} />
                </div>
                <div className={resumeStyles.careerDetail}>
                  <p className={resumeStyles.careerStartDateText}>
                    {format(item.startDate, 'yyyy-MM')}
                  </p>
                  <div className={resumeStyles.careerBox}>
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
          <Link href="/" className={postStyles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  )
}
