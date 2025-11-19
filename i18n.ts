import { getRequestConfig } from 'next-intl/server';

/**
 * next-intl configuration
 * Provides internationalization support
 * @date 2025-11-19 (Taiwan Time)
 */
export default getRequestConfig(async () => {
  // Default locale
  const locale = 'en';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
