import { Metadata } from 'next';

import { AnimatedCard, CardTitle } from '@/components/ui/Card';
import { APP_NAME } from '@/constants';
import SignInForm from '@/features/auth/components/SigninForm';

export const metadata: Metadata = {
  title: `Sign In – ${APP_NAME}`,
  description: 'Authentication',
};

export default async function SigninPage() {
  return (
    <AnimatedCard>
      {/* <CardLogo /> */}
      <CardTitle>Sign In</CardTitle>
      <SignInForm />
    </AnimatedCard>
  );
}
