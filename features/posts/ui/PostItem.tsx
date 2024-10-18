import Link from 'next/link'
import styled from 'styled-components'
import Paragraph from '../../../components/Paragraph'
import Title from '../../../components/text'

const Post = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DateLocale = styled(Paragraph)`
  opacity: 0.65;
`

const PostTitleLink = styled(Link)`
  flex: 1;
  margin: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  a {
    color: inherit;
  }
`

export default function PostItem({
  post,
}: {
  post: {
    id: string
    createdTime: Date
    lastEditedTime: Date
    dateLocale: string
    slug: any
    title: any
    status: any
  }
}) {
  return (
    <Post key={post.id}>
      <PostTitleLink href={`/article/${post.slug}`}>
        <Paragraph
          style={{
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          <Title title={post.title} />
        </Paragraph>
      </PostTitleLink>
      <DateLocale>{post.dateLocale}</DateLocale>
    </Post>
  )
}
