import { Metadata } from 'next';

import { AnimatedCard, CardTitle } from '@/components/ui/Card';
import { APP_NAME } from '@/constants';
import InviteForm from '@/features/auth/components/InviteForm';

export const metadata: Metadata = {
  title: `Invite code – ${APP_NAME}`,
  description: 'Account creation',
};

export default async function InviteCodePage() {
  return (
    <AnimatedCard>
      {/* <CardLogo /> */}
      <CardTitle className="text-accent">Invite code</CardTitle>
      <InviteForm />
    </AnimatedCard>
  );
}
