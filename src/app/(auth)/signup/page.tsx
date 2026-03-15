import { Metadata } from 'next';

import { AnimatedCard, CardTitle } from '@/components/ui/Card';
import { APP_NAME } from '@/constants';
import SignUpForm from '@/features/auth/components/SignupForm';

export const metadata: Metadata = {
  title: `Sign Up – ${APP_NAME}`,
  description: 'Account creation',
};

export default async function SignupPage() {
  return (
    <AnimatedCard>
      {/* <CardLogo /> */}
      <CardTitle className="text-accent">Sign Up</CardTitle>
      <SignUpForm />
    </AnimatedCard>
  );
}
