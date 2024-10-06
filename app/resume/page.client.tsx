'use client'

import { Fragment } from 'react'
import Link from 'next/link'
// import { format } from 'date-fns'
// import styled from 'styled-components/native'
// import html2canvas from 'html2canvas'
// import html2pdf from 'html2pdf.js'
import { renderBlock } from '../../components/notion/renderer'
import postStyles from './resume.contents.module.css'
// import resumeStyles from './page.module.css'
// import Paragraph from '../../components/Paragraph'
// import './page.css'

// const CareerCircleText = styled(Paragraph)`
//   text-align: center;
//   margin: 0px;
// `

// const CareerStartDateText = styled(Paragraph)`
//   margin: 0px;
//   margin-bottom: 12px;
// `

export default function ResumePage({
  careerBlocks,
  sideProjectCareerBlocks,
}: {
  careerBlocks: never[]
  sideProjectCareerBlocks: never[]
}) {
  // const takeScreenshot = () => {
  //   // Scroll to the top to ensure the entire document is visible
  //   window.scrollTo(0, 0)

  //   // Wait for the scroll to complete
  //   setTimeout(() => {
  //     html2canvas(document.body, { useCORS: true }).then((canvas) => {
  //       // Create an image from the canvas
  //       const link = document.createElement('a')
  //       link.href = canvas.toDataURL()
  //       link.download = 'full_page_screenshot.png'
  //       link.click()
  //     })
  //   }, 500) // You may adjust the delay if needed
  // }

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
      <article className={postStyles.container}>
        <section>
          {careerBlocks.map((block) => (
            // @ts-ignore
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
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
        <Link href="/" className={postStyles.back}>
          ← Go home
        </Link>
      </article>
    </div>
  )
}
