import { Visual } from '@/components/ui/Visual';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="size-full flex trans-c">
      <div className="w-full md:w-[400px] flex-center">{children}</div>
      <Visual />
    </div>
  );
}
