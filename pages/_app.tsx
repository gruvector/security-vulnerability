import { AppProps } from 'next/app';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav>
        <Link href="/">Home</Link> &nbsp; &nbsp;
        <Link href="/login">Login</Link> &nbsp; &nbsp;
        <Link href="/register">Register</Link> &nbsp; &nbsp;
        {/* eslint-disable-next-line */}
        <a href="/logout">Logout</a>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}
