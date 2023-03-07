import { getUsers } from '../../../database/users';
import Common, { Colors } from '../common';

export default async function SecretsExposurePage() {
  const colorsResponse = await fetch(
    `https://reqres.in/api/colors?apiKey=${process.env.API_KEY!}`,
  );
  const colors: Colors = await colorsResponse.json();

  const users = await getUsers();

  return <Common colors={colors} users={users} />;
}
