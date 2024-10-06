'use client'

import { Fragment } from 'react'
import Link from 'next/link'
// import { format } from 'date-fns'
// import styled from 'styled-components/native'
// import html2canvas from 'html2canvas'
// import html2pdf from 'html2pdf.js'
import { renderBlock } from '../../components/notion/renderer'
import postStyles from './resume.contents.module.css'
import ArticleCareer from './components/article.career'

export default function ResumePage({
  careerBlocks,
  sideProjectCareerBlocks,
}: {
  careerBlocks: never[]
  sideProjectCareerBlocks: never[]
}) {
  // const generatePDF = () => {
  //   // Set options for html2pdf
  //   const options = {
  //     margin: 1,
  //     filename: 'website_screenshot.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //     pagebreak: { mode: 'avoid-all' },
  //   }

  //   // Select the element to capture
  //   const element = document.body

  //   // Generate PDF
  //   html2pdf()
  //     .from(element)
  //     .set({
  //       ...options,
  //     })
  //     .save()
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     // generatePDF()
  //   }, 1500)
  // }, [])

  return (
    <div>
      <ArticleCareer careerBlocks={careerBlocks} />

      <article className={postStyles.container}>
        <section>
          {sideProjectCareerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>

      {process.env.NODE_ENV === 'development' && (
        <article className={postStyles.container}>
          <Link href="/" className={postStyles.back}>
            ← Go home
          </Link>
        </article>
      )}
    </div>
  )
}
