import { UrlObject } from 'node:url';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Url = string | UrlObject;
type InternalLinkProps = {
  href: Url;
  as?: Url;
  replace?: boolean;
  /**
   * TODO-APP
   */
  soft?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  /**
   * requires experimental.newNextLinkBehavior
   */
  onMouseEnter?: (e: any) => void;
  /**
   * requires experimental.newNextLinkBehavior
   */
  onClick?: (e: any) => void;
};

export default function LinkIfNotCurrent({
  baseHref,
  ...props
}: Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof InternalLinkProps
> &
  InternalLinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement> & {
    baseHref?: string;
  }) {
  const router = useRouter();

  if (
    router.pathname === props.href ||
    (baseHref && router.pathname.startsWith(baseHref))
  ) {
    return <span>{props.children}</span>;
  }

  return <Link {...props} />;
}
