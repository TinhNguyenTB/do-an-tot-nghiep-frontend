import { LanguageSwitcher } from '@/components/Atoms/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export function HomeTemplate() {
  const { t } = useTranslation('home')
  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
    </main>
  )
}
