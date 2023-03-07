'use client';
import { useEffect, useState } from 'react';
import { User } from '../../../database/users';
import Common, { Colors } from '../common';

type Props = {
  apiKey: string;
  users: User[];
};

export default function SecretsExposure(props: Props) {
  const [colors, setColors] = useState<Colors>(null);

  useEffect(() => {
    const fetchData = async () => {
      const colorsResponse = await fetch(
        `https://reqres.in/api/colors?apiKey=${props.apiKey}`,
      );

      const newColors: Colors = await colorsResponse.json();

      setColors(newColors);
    };

    fetchData().catch((error) => {
      console.error(error);
    });
  }, [props.apiKey]);

  return <Common apiKey={props.apiKey} colors={colors} users={props.users} />;
}
