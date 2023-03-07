'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export default function LinkIfNotCurrent<RouteType>({
  matchParentSegment,
  ...props
}: LinkProps<RouteType> & {
  matchParentSegment?: boolean;
}) {
  const pathname = usePathname();

  if (
    pathname === props.href ||
    (matchParentSegment &&
      pathname.startsWith((props.href as string).match(/^(\/.+\/)[^/]+$/)![1]!))
  ) {
    return <span>{props.children}</span>;
  }

  return <Link {...props} />;
}
