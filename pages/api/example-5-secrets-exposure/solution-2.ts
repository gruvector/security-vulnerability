import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../../database/users';

export default async function missingAuthenticationHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const sessionToken = request.cookies.sessionToken;

  if (!sessionToken) {
    response.status(401).json({
      error: 'Session token not provided',
    });
    return;
  }

  const user = await getUserByValidSessionToken(sessionToken);

  if (!user) {
    response.status(401).json({
      error: 'Session token not valid',
    });
    return;
  }

  const apiResponse = await fetch(
    `https://reqres.in/api/unknown?apiKey=${process.env.API_KEY}`,
  );

  const apiResults = await apiResponse.json();
  response.status(200).json(apiResults);
}
