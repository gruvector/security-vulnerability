'use client';
import { useEffect, useState } from 'react';
import { User } from '../../../database/users';
import Common, { Colors } from '../common';

type Props = {
  users: User[];
};

export default function SecretsExposure(props: Props) {
  const [colors, setColors] = useState<Colors>(null);

  useEffect(() => {
    const fetchData = async () => {
      const colorsResponse = await fetch(
        '/api/example-5-secrets-exposure/solution-2',
      );

      const newColors: Colors = await colorsResponse.json();

      setColors(newColors);
    };

    fetchData().catch((error) => {
      console.error(error);
    });
  }, []);

  return <Common colors={colors} users={props.users} />;
}
