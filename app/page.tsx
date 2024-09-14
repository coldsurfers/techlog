import { queryNotionBlogTechArticles } from '../lib/utils'
import PageClient from './page.client'

const Page = async () => {
  const posts = await queryNotionBlogTechArticles()
  return <PageClient posts={posts} />
}

export default Page
