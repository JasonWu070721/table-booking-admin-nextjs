import { useTranslations } from 'next-intl';

export default function Login() {
  const t = useTranslations('LoginPage');
  return (
    <div>
      <h1>{t('user')}</h1>
      <h1>{t('password')}</h1>
    </div>
  );
}
