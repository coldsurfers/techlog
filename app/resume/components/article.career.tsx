'use client'

import { Fragment } from 'react'
import { renderCareerBlock } from '../../../components/notion/renderer.career'
import resumeContentsStyles from '../resume.contents.module.css'

const ArticleCareer = ({ careerBlocks }: { careerBlocks: never[] }) => (
  <article className={resumeContentsStyles.container}>
    <section>
      {careerBlocks.map((block) => (
        // @ts-ignore
        <Fragment key={block.id}>{renderCareerBlock(block)}</Fragment>
      ))}
    </section>
  </article>
)

export default ArticleCareer
