import { redirect } from 'next/navigation';

import { SIGNIN_REDIRECT } from '@/core/constants';
import EditQuotesClient from '@/core/features/quotes/components/EditQuotesClient';
import { auth } from '~/auth';

export default async function EditQuotesPage() {
  const session = await auth();
  if (!session?.user) return redirect(SIGNIN_REDIRECT);

  return <EditQuotesClient />;
}
