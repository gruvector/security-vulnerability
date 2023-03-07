import { getUsers } from '../../../database/users';
import SecretsExposure from './SecretsExposure';

export default async function SecretsExposurePage() {
  const users = await getUsers();

  return <SecretsExposure users={users} />;
}
