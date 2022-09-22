import { useEffect, useState } from 'react';
import { getUsers, User } from '../../database/users';
import Common from './common';

type Props = {
  users: User[];
};

export default function SecretsExposureGssp(props: Props) {
  const [apiResults, setApiResults] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/example-5-secret-exposure/solution-2');

      const data = await response.json();

      setApiResults(data);
    };

    fetchData().catch(() => {});
  }, []);

  return <Common {...props} apiResults={apiResults} />;
}

export async function getServerSideProps() {
  const users = await getUsers();
  return {
    props: {
      users: users,
    },
  };
}
