import { redirect } from 'next/navigation';

import { SIGNIN_REDIRECT } from '@/constants';
import EditQuotesClient from '@/features/quotes/components/EditQuotesClient';
import { auth } from '~/auth';

export default async function EditQuotesPage() {
  const session = await auth();
  if (!session?.user) return redirect(SIGNIN_REDIRECT);

  return <EditQuotesClient />;
}
