import LinkIfNotCurrent from '../../components/LinkIfNotCurrent';
import { User } from '../../database/users';

type Props = {
  apiKey?: string;
  apiResults: unknown[];
  users: User[];
};

export default function Common(props: Props) {
  return (
    <div>
      <h1>Secrets Exposure - getServerSideProps</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure-gssp/vulnerable">
            Vulnerable
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>pages/api/example-5-secrets-exposure-gssp/vulnerable.ts</code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure-gssp/solution-1">
            Solution 1
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>pages/api/example-5-secrets-exposure-gssp/solution-1.ts</code>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-5-secrets-exposure-gssp/solution-2">
            Solution 2
          </LinkIfNotCurrent>{' '}
          - API code:{' '}
          <code>pages/api/example-5-secrets-exposure-gssp/solution-2.ts</code>
        </li>
      </ul>

      <hr />

      <div>
        The following API key should not be any value other than "undefined" in
        the frontend regardless of which user tries to access the page:
      </div>

      <pre>process.env.API_KEY: {JSON.stringify(props.apiKey)}</pre>

      <hr />

      <div>
        The following API results were fetched using the process.env.API_KEY
        variable:
      </div>

      <pre>{JSON.stringify(props.apiResults, null, 2)}</pre>

      <hr />

      <div>
        The following users should not contain the "passwordHash" property,
        regardless of which user tries to access the page:
      </div>

      <pre>{JSON.stringify(props.users, null, 2)}</pre>
    </div>
  );
}
