'use client'

import { Fragment } from 'react'
import Link from 'next/link'
// import { format } from 'date-fns'
// import styled from 'styled-components/native'
import { renderBlock } from '../../components/notion/renderer'
import postStyles from '../../styles/post.module.css'
// import resumeStyles from './page.module.css'
// import Paragraph from '../../components/Paragraph'
import { getCareerData } from './fetchers'

// const CareerCircleText = styled(Paragraph)`
//   text-align: center;
//   margin: 0px;
// `

// const CareerStartDateText = styled(Paragraph)`
//   margin: 0px;
//   margin-bottom: 12px;
// `

export default function ResumePage({
  // careerData,
  careerBlocks,
  musicCareerBlocks,
  sideProjectCareerBlocks,
}: {
  careerData: Awaited<ReturnType<typeof getCareerData>>
  careerBlocks: never[]
  musicCareerBlocks: never[]
  sideProjectCareerBlocks: never[]
}) {
  return (
    <div>
      <article className={postStyles.container}>
        <section>
          {careerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          {/* <div>
            {careerData.map((item, index) => (
              <div
                key={item.company}
                className={resumeStyles.careerItemWrapper}
              >
                <div className={resumeStyles.careerLeft}>
                  <div className={resumeStyles.careerCircle}>
                    <CareerCircleText>
                      {careerData.length - index}
                    </CareerCircleText>
                  </div>
                  <div className={resumeStyles.careerLeftVerticalLine} />
                </div>
                <div className={resumeStyles.careerDetail}>
                  <CareerStartDateText>
                    {format(item.startDate, 'yyyy-MM')}
                  </CareerStartDateText>
                  <div className={resumeStyles.careerBox}>
                    <Paragraph style={{ fontWeight: 'bold', fontSize: 20 }}>
                      {item.company}
                    </Paragraph>
                    <div>
                      {item.CareerChapter.map((chapter) => (
                        <Fragment key={chapter.id}>
                          <div style={{ marginTop: 8 }}>
                            <Paragraph
                              style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                              }}
                            >
                              {chapter.title}
                            </Paragraph>
                          </div>
                          <ul style={{ marginTop: 4 }}>
                            {chapter.CareerSmallChapter.map((smallChapter) => (
                              <li key={smallChapter.id}>
                                <Paragraph>
                                  {smallChapter.description}
                                </Paragraph>
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
          </div> */}
        </section>
      </article>

      <article className={postStyles.container}>
        <section>
          {sideProjectCareerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>

      <article className={postStyles.container}>
        <section>
          {musicCareerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>

      <article className={postStyles.container}>
        <Link href="/" className={postStyles.back}>
          ← Go home
        </Link>
      </article>
    </div>
  )
}
