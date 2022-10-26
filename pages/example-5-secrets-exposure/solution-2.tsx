import { GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import { getUsers, User } from '../../database/users';
import Common from './common';

type Props = {
  users: User[];
};

export default function SecretsExposure(props: Props) {
  const [apiResults, setApiResults] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        '/api/example-5-secrets-exposure/solution-2',
      );

      const data = await response.json();

      setApiResults(data);
    };

    fetchData().catch(() => {});
  }, []);

  return <Common {...props} apiResults={apiResults} />;
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const users = await getUsers();
  return {
    props: {
      users: users,
    },
  };
}
