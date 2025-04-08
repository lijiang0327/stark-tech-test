import * as React from 'react';

import { AppProvider } from '@/providers';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          {props.children}
        </AppProvider>
      </body>
    </html>
  );
}