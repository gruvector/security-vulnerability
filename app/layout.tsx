import './global.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserByValidSessionToken } from '../database/users';
import LinkIfNotCurrent from './LinkIfNotCurrent';

export const metadata = {
  title: {
    default: 'Next.js + Postgres.js: Broken Security Examples',
    template: '%s | Next.js + Postgres.js: Broken Security Examples',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserByValidSessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <LinkIfNotCurrent href="/">Home</LinkIfNotCurrent>

            <LinkIfNotCurrent
              href="/example-1-missing-authentication-route-handler/vulnerable"
              matchParentSegment
            >
              Example 1
            </LinkIfNotCurrent>

            <LinkIfNotCurrent
              href="/example-2-missing-authentication-server-component/vulnerable"
              matchParentSegment
            >
              Example 2
            </LinkIfNotCurrent>

            <LinkIfNotCurrent
              href="/example-3-missing-authorization-route-handler/vulnerable-1"
              matchParentSegment
            >
              Example 3
            </LinkIfNotCurrent>

            <LinkIfNotCurrent
              href="/example-4-missing-authorization-server-component/vulnerable-1"
              matchParentSegment
            >
              Example 4
            </LinkIfNotCurrent>
            <LinkIfNotCurrent
              href="/example-5-secrets-exposure/vulnerable"
              matchParentSegment
            >
              Example 5
            </LinkIfNotCurrent>

            <LinkIfNotCurrent
              href="/example-6-cross-site-scripting/vulnerable"
              matchParentSegment
            >
              Example 6
            </LinkIfNotCurrent>

            <div>
              {!user ? (
                <Link href="/login">Login</Link>
              ) : (
                <>
                  <a href="/logout">Logout</a>
                  <div>Logged in as {user.username}</div>
                </>
              )}
            </div>
          </nav>
        </header>

        <main>{props.children}</main>
      </body>
    </html>
  );
}
