import { User } from '../../database/users';
import LinkIfNotCurrent from '../LinkIfNotCurrent';

export type Colors = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
  }[];
  support: {
    url: string;
    text: string;
  };
} | null;

type Props = {
  apiKey?: string;
  colors: Colors;
  users: User[];
};

export default function Common(props: Props) {
  return (
    <>
      <h1>Secrets Exposure</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>pages/api/example-5-secrets-exposure/solution-2.ts</code>
        </li>
      </ul>

      <hr />

      <div>
        The following API key should not be any value other than "undefined" in
        the frontend regardless of which user tries to access the page:
      </div>

      <pre>process.env.API_KEY: {JSON.stringify(props.apiKey)}</pre>

      <hr />

      <details>
        <summary>
          Show API results fetched using the process.env.API_KEY variable
        </summary>

        <pre>{JSON.stringify(props.colors, null, 2)}</pre>
      </details>

      <hr />

      <div>
        The following users should not contain the "passwordHash" property,
        regardless of which user tries to access the page:
      </div>

      <pre>{JSON.stringify(props.users, null, 2)}</pre>
    </>
  );
}
