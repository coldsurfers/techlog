'use client'

import Link from 'next/link'
import styled from 'styled-components/native'
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

export default async function Page() {
  const posts = await queryNotionBlogTechArticles()
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
        </Header>

        <Heading>All Posts</Heading>
        <ol className={styles.posts}>
          {posts.map((post) => (
            <li key={post.id} className={styles.post}>
              <h3 className={styles.postTitle}>
                <Link href={`/article/${post.slug}`}>
                  <Paragraph style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <Title title={post.title} />
                  </Paragraph>
                </Link>
              </h3>

              <p className={styles.postDescription}>{post.dateLocale}</p>
              <Link href={`/article/${post.slug}`}>Read post →</Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
