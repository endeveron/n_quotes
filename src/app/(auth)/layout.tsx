import Image from 'next/image';
import { APP_NAME } from '@/core/constants';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="size-full flex trans-c">
      <div className="relative w-full md:w-[400px] flex-center">{children}</div>
      <div className="relative max-md:hidden flex-1 flex-center flex-col bg-area select-none">
        <Image
          src="/images/icons/icon.svg"
          className="fade"
          // fill
          width={512}
          height={512}
          priority
          quality={100}
          unoptimized
          alt="Photo"
        />

        <div className="my-6 font-pt text-5xl lg:text-6xl text-accent font-bold">
          {APP_NAME}
        </div>
      </div>
    </div>
  );
}
