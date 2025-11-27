import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation('home')

  return (
    <main>
      <h1>{t('welcome')}</h1>
    </main>
  )
}
