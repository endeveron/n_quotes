import { Metadata } from 'next';

import { AnimatedCard, CardContent, CardTitle } from '@/components/ui/Card';
import { APP_NAME } from '@/constants';
import GenerateTokenButton from '@/features/auth/components/GenerateTokenButton';
import { SearchParams } from '@/types/common';
import { getErrorMessageFromSearchParams } from '@/utils/error';
import { EMAIL_ERRORS } from '@/features/auth/constants';

export const metadata: Metadata = {
  title: `Email error – ${APP_NAME}`,
  description: 'Email confirmation',
};

export default async function EmailErrorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { e, c } = await searchParams;
  const email = e as string;
  const errCodeStr = c as string;

  if (!email || !errCodeStr) {
    throw new Error('Invalid search params');
  }

  const errorMessage = getErrorMessageFromSearchParams(
    errCodeStr as string,
    EMAIL_ERRORS,
  );

  return (
    <AnimatedCard>
      <CardTitle className="text-error">Oops!</CardTitle>
      <CardContent>
        <p className="-mt-2 text-center">{errorMessage}</p>

        <div className="flex-center">
          <GenerateTokenButton
            email={email}
            className="mt-6"
            btnTitle="Generate a new token"
          />
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
