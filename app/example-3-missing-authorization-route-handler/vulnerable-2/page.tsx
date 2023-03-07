import { cookies } from 'next/headers';
import { getUserByValidSessionToken } from '../../../database/users';
import MissingAuthorizationApiRoute from './MissingAuthorizationApiRoute';

export default async function MissingAuthorizationApiRoutePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserByValidSessionToken(sessionToken.value);

  return <MissingAuthorizationApiRoute user={user} />;
}
