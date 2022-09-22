import { AppProps } from 'next/app';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import LinkIfNotCurrent from '../components/LinkIfNotCurrent';
import { User } from '../database/users';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    console.log(data);

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  return (
    <div>
      <nav style={{ display: 'flex' }}>
        <LinkIfNotCurrent href="/">
          <a style={{ marginRight: 15 }}>Home</a>
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-1-missing-authentication-api-route/vulnerable"
          baseHref="/example-1-missing-authentication-api-route/"
        >
          <a style={{ marginRight: 15 }}>Example 1</a>
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-2-missing-authentication-gssp/vulnerable"
          baseHref="/example-2-missing-authentication-gssp/"
        >
          <a style={{ marginRight: 15 }}>Example 2</a>
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-3-missing-authorization-api-route/vulnerable-1"
          baseHref="/example-3-missing-authorization-api-route/"
        >
          <a style={{ marginRight: 15 }}>Example 3</a>
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-4-missing-authorization-gssp/vulnerable-1"
          baseHref="/example-4-missing-authorization-gssp/"
        >
          <a style={{ marginRight: 15 }}>Example 4</a>
        </LinkIfNotCurrent>
        <LinkIfNotCurrent
          href="/example-5-secrets-exposure-gssp/vulnerable"
          baseHref="/example-5-secrets-exposure-gssp/"
        >
          <a style={{ marginRight: 15 }}>Example 5</a>
        </LinkIfNotCurrent>

        <div style={{ marginLeft: 'auto' }}>
          {!user && (
            <>
              <Link href="/login">
                <a style={{ marginRight: 15 }}>Login</a>
              </Link>
              <Link href="/register">
                <a style={{ marginRight: 15 }}>Register</a>
              </Link>
            </>
          )}

          {user && (
            <>
              {/* eslint-disable-next-line */}
              <a href="/logout" style={{ marginRight: 15 }}>
                Logout
              </a>
              Logged in as {user.username}
            </>
          )}
        </div>
      </nav>

      <Component
        {...pageProps}
        userObject={user}
        refreshUserProfile={refreshUserProfile}
      />
    </div>
  );
}
