import { redirect } from 'next/navigation';

import MainMenu from '@/core/components/ui/MainMenu';
import { SIGNIN_REDIRECT } from '@/core/constants';
import QuoteCard from '@/core/features/quotes/components/QuoteCard';
import { auth } from '~/auth';

export default async function MainPage() {
  const session = await auth();
  if (!session?.user) return redirect(SIGNIN_REDIRECT);

  return (
    <>
      {/* Header */}
      <div className="fixed z-10 top-6 right-4">
        <MainMenu
          userData={{ name: session.user.name, email: session.user.email }}
        />
      </div>

      <main className="h-full w-full min-w-xs m-auto flex-center p-4">
        {/* <div className="flex-center flex-1 lg:max-w-lg py-8">
          Content
        </div> */}
        <QuoteCard />
      </main>
    </>
  );
}
