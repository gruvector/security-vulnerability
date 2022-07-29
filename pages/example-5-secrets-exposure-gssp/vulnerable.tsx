import { useEffect, useState } from 'react';
import { getUsersWithPasswordHash, User } from '../../database/users';
import Common from './common';

type Props = {
  apiKey: string;
  users: User[];
};

export default function MissingAuthentication(props: Props) {
  const [apiResults, setApiResults] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://reqres.in/api/unknown?apiKey=${props.apiKey}`,
      );

      const data = await response.json();

      setApiResults(data);
    };

    fetchData().catch(() => {});
  }, [props.apiKey]);

  return <Common {...props} apiResults={apiResults} />;
}

export async function getServerSideProps() {
  const users = await getUsersWithPasswordHash();
  return {
    props: {
      apiKey: process.env.API_KEY,
      users: users,
    },
  };
}
