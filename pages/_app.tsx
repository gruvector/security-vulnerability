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

    if ('errors' in data) {
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
      <nav style={{ display: 'flex', gap: 15 }}>
        <LinkIfNotCurrent href="/">Home</LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-1-missing-authentication-api-route/vulnerable"
          baseHref="/example-1-missing-authentication-api-route/"
        >
          Example 1
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-2-missing-authentication-gssp/vulnerable"
          baseHref="/example-2-missing-authentication-gssp/"
        >
          Example 2
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-3-missing-authorization-api-route/vulnerable-1"
          baseHref="/example-3-missing-authorization-api-route/"
        >
          Example 3
        </LinkIfNotCurrent>

        <LinkIfNotCurrent
          href="/example-4-missing-authorization-gssp/vulnerable-1"
          baseHref="/example-4-missing-authorization-gssp/"
        >
          Example 4
        </LinkIfNotCurrent>
        <LinkIfNotCurrent
          href="/example-5-secrets-exposure-gssp/vulnerable"
          baseHref="/example-5-secrets-exposure-gssp/"
        >
          Example 5
        </LinkIfNotCurrent>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 15 }}>
          {!user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              {/* eslint-disable-next-line */}
              <a href="/logout">Logout</a>
              <div>Logged in as {user.username}</div>
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
