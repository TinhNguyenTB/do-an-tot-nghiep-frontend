import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

const languages = [
  {
    value: 'en',
    label: (
      <span className='flex gap-1.5 items-center'>
        <img
          src='/images/Flag_of_the_United_States.png'
          alt='English'
          style={{ width: 20, height: 20 }}
        />
        English
      </span>
    )
  },
  {
    value: 'vi',
    label: (
      <span className='flex gap-1.5 items-center'>
        <img src='/images/Flag_of_Vietnam.png' alt='Tiếng Việt' style={{ width: 20, height: 20 }} />
        Tiếng Việt
      </span>
    )
  }
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <Select
      value={i18n.language}
      style={{ width: 150 }}
      onChange={(value) => i18n.changeLanguage(value)}
      options={languages}
    />
  )
}
