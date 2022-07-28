import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

type Errors = { message: string }[];

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register on this website" />
      </Head>

      <h1>Register</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const registerResponse = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const registerResponseBody =
            (await registerResponse.json()) as RegisterResponseBody;

          if ('errors' in registerResponseBody) {
            setErrors(registerResponseBody.errors);
            return;
          }

          await router.push('/');
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
        <button>Register</button>
      </form>

      <div>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    const session = await getValidSessionByToken(token);

    if (session) {
      console.log(session);
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
