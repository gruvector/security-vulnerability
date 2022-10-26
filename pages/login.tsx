import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login on this website" />
      </Head>

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

          const loginResponseBody =
            (await loginResponse.json()) as LoginResponseBody;

          if ('errors' in loginResponseBody) {
            setErrors(loginResponseBody.errors);
            return;
          }

          // Get the query parameter from the Next.js router
          const returnTo = router.query.returnTo;
          console.log('returnTo', returnTo);

          if (
            returnTo &&
            !Array.isArray(returnTo) &&
            // Security: Validate returnTo parameter against valid path
            // (because this is untrusted user input)
            /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
          ) {
            await router.push(returnTo);
            return;
          }

          // Login worked, redirect to the homepage using the Next.js router
          props.refreshUserProfile();
          await router.push(`/`);
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
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Omit<Props, 'refreshUserProfile'>>> {
  const token = context.req.cookies.sessionToken;

  if (token) {
    const session = await getValidSessionByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
