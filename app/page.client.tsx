'use client'

import Link from 'next/link'
import styled from 'styled-components/native'
import styledW from 'styled-components'
import styles from './index.module.css'
import { queryNotionBlogTechArticles } from '../lib/utils'
import Title from '../components/text'
import Paragraph from '../components/Paragraph'

const Header = styled.Text`
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
`

const Heading = styled(Paragraph)`
  margin-bottom: 20px;
  padding-bottom: 20px;
  text-transform: uppercase;
  font-size: 20px;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-weight: bold;
`

const DateLocale = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 12px;
  opacity: 0.65;
`

const Posts = styledW.ol`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Post = styledW.li`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export default function Page({
  posts,
}: {
  posts: Awaited<ReturnType<typeof queryNotionBlogTechArticles>>
}) {
  return (
    <div>
      <main className={styles.container}>
        <Header>
          <Paragraph
            style={{
              fontSize: 32,
              fontWeight: 'bold',
            }}
          >
            TechLog
          </Paragraph>
          <Paragraph
            style={{ fontSize: 20, fontWeight: 'bold', marginTop: 12 }}
          >
            Creative, Attractive and flexible
          </Paragraph>
          <Paragraph
            style={{ fontSize: 14, fontWeight: '400', marginTop: 8 }}
          >{`Simple Tech Blog. Thanks for the visiting`}</Paragraph>
          <Link href="/resume" style={{ marginTop: 14 }}>
            <Paragraph>Resume</Paragraph>
          </Link>
        </Header>

        <Heading>All Posts</Heading>
        <Posts>
          {posts.map((post) => (
            <Post key={post.id}>
              <h3 className={styles.postTitle}>
                <Link href={`/article/${post.slug}`}>
                  <Paragraph style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <Title title={post.title} />
                  </Paragraph>
                </Link>
              </h3>
              <DateLocale>{post.dateLocale}</DateLocale>
              <Link href={`/article/${post.slug}`}>
                <Paragraph>Read post →</Paragraph>
              </Link>
            </Post>
          ))}
        </Posts>
      </main>
    </div>
  )
}
