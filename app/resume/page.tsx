import { getBlocks } from '../../lib/notion'
import { getCareerData, queryNotionResumePage } from './fetchers'
import PageClient from './page.client'

const ResumePage = async () => {
  const careerData = await getCareerData()
  const resumeResult = await queryNotionResumePage()
  const { results } = resumeResult
  const page = results.at(0)

  if (!page) {
    return null
  }

  const blocks = await getBlocks(page.id)

  return <PageClient careerData={careerData} blocks={blocks} page={page} />
}

export default ResumePage
