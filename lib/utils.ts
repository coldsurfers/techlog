import { cache } from 'react'
import notionInstance, { notionDatabaseIds } from './notionInstance'

export const queryNotionBlogTechArticles = cache(async () => {
  const result = await notionInstance.databases.query({
    database_id: notionDatabaseIds.blog ?? '',
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    filter: {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'platform',
          multi_select: {
            contains: 'techlog',
          },
        },
      ],
    },
  })

  const posts = result?.results?.map((post) => {
    // @ts-ignore
    const createdTime = new Date(post.created_time)
    // @ts-ignore
    const lastEditedTime = new Date(post.last_edited_time)
    // @ts-ignore
    const slug = post.properties?.Slug?.rich_text?.at(0)?.text.content
    // @ts-ignore
    const title = post.properties?.Name?.title
    // @ts-ignore
    const postStatus = post.properties.Status.status.name
    return {
      id: post.id,
      createdTime,
      lastEditedTime,
      dateLocale: createdTime.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      slug,
      title,
      status: postStatus,
    }
  })

  return posts
})

export const getBlogTechPageFromSlug = cache(
  async ({ slug }: { slug: string }) => {
    const res = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      filter: {
        and: [
          {
            property: 'Slug',
            formula: {
              string: {
                equals: slug,
              },
            },
          },
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            property: 'platform',
            multi_select: {
              contains: 'techlog',
            },
          },
        ],
      },
    })
    if (res.results.length) {
      return res.results[0]
    }
    return null
  }
)
