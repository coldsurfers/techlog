import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'

async function queryNotionResumePage() {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume,
  })
  return res
}

export default async function ResumePage() {
  const resume = await queryNotionResumePage()
  console.log(resume)
  return null
}
