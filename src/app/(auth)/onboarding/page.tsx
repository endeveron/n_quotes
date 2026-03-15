import { Metadata } from 'next';

import { verifyUserId } from '@/features/auth/actions';
import OnboardingForm from '@/features/auth/components/OnboardingForm';
import {
  AnimatedCard,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/Card';
import { SearchParams } from '@/types/common';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Onboarding – ${APP_NAME}`,
  description: 'Account creation',
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { t } = await searchParams;
  const userId = t as string;

  if (!userId) throw new Error(`Invalid search param for user's objectId`);

  // Check the validity of the user objectId
  await verifyUserId(userId);

  return (
    <AnimatedCard>
      <CardTitle className="text-accent">Onboarding</CardTitle>
      <CardDescription className="text-muted">
        Email successfully verified
      </CardDescription>
      <CardContent>
        <OnboardingForm userId={userId} />
      </CardContent>
    </AnimatedCard>
  );
}
