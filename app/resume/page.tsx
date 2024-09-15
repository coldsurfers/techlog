import { getBlocks } from '../../lib/notion'
import { getCareerData, queryNotionResumePage } from './fetchers'
import PageClient from './page.client'

const ResumePage = async () => {
  const careerData = await getCareerData()
  const careerResult = await queryNotionResumePage('Career')
  const musicCareerResult = await queryNotionResumePage('Music Career')
  const careerPage = careerResult.results.at(0)
  const musicCareerPage = musicCareerResult.results.at(0)

  if (!careerPage || !musicCareerPage) {
    return null
  }

  const careerBlocks = await getBlocks(careerPage.id)
  const musicCareerBlocks = await getBlocks(musicCareerPage.id)

  return (
    <PageClient
      careerData={careerData}
      careerBlocks={careerBlocks}
      musicCareerBlocks={musicCareerBlocks}
    />
  )
}

export default ResumePage
