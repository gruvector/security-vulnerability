import { GetServerSidePropsResult } from 'next';
import { getUsers, User } from '../../database/users';
import Common from './common';

type Props = {
  apiKey?: string;
  apiResults: unknown[];
  users: User[];
};

export default function SecretsExposure(props: Props) {
  return <Common {...props} />;
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const users = await getUsers();

  const response = await fetch(
    `https://reqres.in/api/unknown?apiKey=${process.env.API_KEY}`,
  );

  const apiResults = await response.json();

  return {
    props: {
      apiResults: apiResults,
      users: users,
    },
  };
}
