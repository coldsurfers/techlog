import { cache } from 'react'
import { database } from '../../lib/database'
import notionInstance, { notionDatabaseIds } from '../../lib/notionInstance'

export const getCareerData = cache(async () => {
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
})

export const queryNotionResumePage = cache(
  async (tagName: 'Career' | 'Side Project Career' | 'Music Career') => {
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
)
