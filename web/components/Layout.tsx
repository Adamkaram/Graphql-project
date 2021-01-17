import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { MeComponent } from "../generated/apolloComponents";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/Hello">
          <a>List of function Component</a>
        </Link>{' '}
        |{' '}
        <Link href="/register">
          <a>register</a>
        </Link>{' '}
        <MeComponent>
          {({ data, loading }) => {
            if (!data || loading || !data.me) {
              return null;
            }

            return (
              <Link href="/logout">
                <a>logout</a>
              </Link>
            );
          }}
        </MeComponent>
        <Link href="/forget-password">
          <a>forget-password</a>
        </Link>{' '}
        | <a href="login">login</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
