import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <ol>
        <li>
          <Link href="/example-1-missing-authentication-api-route/vulnerable">
            Example 1: Missing Authentication - API Route
          </Link>
        </li>
        <li>
          <Link href="/example-2-missing-authentication-gssp/vulnerable">
            Example 2: Missing Authentication - getServerSideProps
          </Link>
        </li>
        <li>
          <Link href="/example-3-missing-authorization-api-route/vulnerable-1">
            Example 3: Missing Authorization - API Route
          </Link>
        </li>
        <li>
          <Link href="/example-4-missing-authorization-gssp/vulnerable-1">
            Example 4: Missing Authorization - getServerSideProps
          </Link>
        </li>
        <li>
          <Link href="/example-5-secrets-exposure/vulnerable">
            Example 5: Data Exposure
          </Link>
        </li>
        <li>
          <Link href="/example-6-cross-site-scripting/vulnerable">
            Example 6: Cross-Site Scripting (XSS)
          </Link>
        </li>
      </ol>
    </div>
  );
}
