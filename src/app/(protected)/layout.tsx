import { redirect } from 'next/navigation';

import { SIGNIN_REDIRECT } from '@/constants';
import { auth } from '~/auth';
import { QuotesProvider } from '@/features/quotes/context/quotes';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) return redirect(SIGNIN_REDIRECT);

  return <QuotesProvider>{children}</QuotesProvider>;
}
