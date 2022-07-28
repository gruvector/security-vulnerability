import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <ol>
        <li>
          <Link href="/page-1-missing-authentication/vulnerable">
            Missing Authentication
          </Link>
        </li>
        <li>
          <Link href="/page-2-missing-authorization/vulnerable">
            Missing Authorization
          </Link>
        </li>
        <li>
          <Link href="/page-3-data-exposure/vulnerable">Data Exposure</Link>
        </li>
      </ol>
    </div>
  );
}
