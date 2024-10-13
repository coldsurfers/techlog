'use client'

import Link from 'next/link'
import styled from 'styled-components/native'
import styledW from 'styled-components'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import {
  queryNotionBlogTechArticles,
  queryNotionBlogThoughtsArticles,
} from '../lib/utils'
import Title from '../components/text'
import Paragraph from '../components/Paragraph'

const Header = styled.Text`
  margin-top: 50px;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
`

const Heading = styled(Paragraph)<{ $isActive: boolean }>`
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 20px;
  opacity: 0.6;
  letter-spacing: 0.5px;
  font-weight: bold;
  border-bottom-width: ${({ $isActive }) => ($isActive ? '1px' : '0px')};
  border-bottom-color: ${({ $isActive }) => ($isActive ? 'white' : 'unset')};
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

const ACTIVE_TAB_KEY = '@blog.coldsurf/activeTab'

export default function Page({
  techPosts,
  thoughtsPosts,
}: {
  techPosts: Awaited<ReturnType<typeof queryNotionBlogTechArticles>>
  thoughtsPosts: Awaited<ReturnType<typeof queryNotionBlogThoughtsArticles>>
}) {
  const [activeTab, setActiveTab] = useState<'tech' | 'thought'>(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY)
      return savedTab === 'thought' ? 'thought' : 'tech'
    }
    return 'tech'
  })

  useEffect(() => {
    localStorage.setItem(ACTIVE_TAB_KEY, activeTab)
  }, [activeTab])

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
            Blog, ColdSurf
          </Paragraph>
          <Paragraph style={{ fontSize: 20, fontWeight: '400', marginTop: 12 }}>
            Creative, Attractive and flexible
          </Paragraph>
          <Link href="/resume" style={{ marginTop: 14, fontSize: 16 }}>
            <Paragraph>Resume →</Paragraph>
          </Link>
        </Header>

        <div style={{ display: 'flex', gap: 20 }}>
          <div
            onClick={() => setActiveTab('tech')}
            style={{ cursor: 'pointer' }}
          >
            <Heading $isActive={activeTab === 'tech'}>TechLogs</Heading>
          </div>
          <div
            onClick={() => setActiveTab('thought')}
            style={{ cursor: 'pointer' }}
          >
            <Heading $isActive={activeTab === 'thought'}>ThoughtLogs</Heading>
          </div>
        </div>
        <Posts>
          {(activeTab === 'tech' ? techPosts : thoughtsPosts).map((post) => (
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
