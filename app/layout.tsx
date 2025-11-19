import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ThemeRegistry from "./theme/registry";

type Props = {
  children: React.ReactNode;
};

/**
 * Root Layout
 * Provides theme and i18n context for the entire application
 * @date 2025-11-19 (Taiwan Time)
 */
export default async function RootLayout({ children }: Props) {
  // Load messages for next-intl
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeRegistry>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}