import Script from 'next/script'

import { Inter } from 'next/font/google'
import StyleSheetRegistry from '../lib/registries/StyleSheetRegistry'
import StyledComponentsRegistry from '../lib/registries/StyledComponentsRegistry'
import '@coldsurfers/hotsurf/global.css'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tech Blog | Coldsurf',
  description: 'Simple Tech Blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google search console */}
        <meta
          name="google-site-verification"
          content="t8pam4eI0ydfgF_W2Js3Q9bdfCsbvZA83PSE2JDh1ww"
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VDP9GWZWGR" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VDP9GWZWGR');
        `}
        </Script>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <StyleSheetRegistry>{children}</StyleSheetRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
