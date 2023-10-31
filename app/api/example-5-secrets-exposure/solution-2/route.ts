import { NextRequest, NextResponse } from 'next/server';
import { getUserByValidSessionToken } from '../../../../database/users';
import { Colors } from '../../../example-5-secrets-exposure/common';

export const dynamic = 'force-dynamic';

type SecretsExposureResponseBodyGet =
  | {
      error: string;
    }
  | Colors;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<SecretsExposureResponseBodyGet>> {
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        error: 'Session token not provided',
      },
      {
        status: 401,
      },
    );
  }

  const user = await getUserByValidSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json(
      {
        error: 'Session token not valid',
      },
      {
        status: 401,
      },
    );
  }

  const colorsResponse = await fetch(
    `https://reqres.in/api/colors?apiKey=${process.env.API_KEY!}`,
  );
  const colors: Colors = await colorsResponse.json();

  return NextResponse.json(colors);
}
