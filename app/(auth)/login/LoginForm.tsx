'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../api/login/route';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <>
      <h1>Login</h1>

      <div>Try the following combinations:</div>

      <pre>{`username: alice / password: abc

username: bob / password: def`}</pre>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const loginResponseBody: LoginResponseBodyPost =
            await loginResponse.json();

          if ('errors' in loginResponseBody) {
            setErrors(loginResponseBody.errors);
            return;
          }

          const returnTo = getSafeReturnToPath(props.returnTo);

          if (returnTo) {
            router.push(returnTo as Route);
            return;
          }

          router.replace('/');
          router.refresh();
        }}
      >
        <label>
          Username:{' '}
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Login</button>
      </form>

      <div style={{ color: 'red' }}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </>
  );
}
