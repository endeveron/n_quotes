'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group cursor-default"
      style={
        {
          '--normal-bg': 'var(--toast)',
          '--normal-text': 'var(--toast-foreground)',
          '--normal-border': 'transparent',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
