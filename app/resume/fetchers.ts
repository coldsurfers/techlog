import { database } from '../../lib/database'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'

export const getCareerData = async () => {
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

export async function queryNotionResumePage(
  tagName: 'Career' | 'Side Project Career' | 'Music Career'
) {
  const res = await notionInstance.databases.query({
    database_id: notionDatabaseIds.resume ?? '',
    filter: {
      property: 'Tags',
      multi_select: {
        contains: tagName,
      },
    },
  })
  return res
}
