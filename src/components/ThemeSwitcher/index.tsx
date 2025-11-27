import { Switch } from 'antd'
import { useThemeMode } from '@/hoc/ThemeProvider'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

export function ThemeSwitcher() {
  const { isDark, setIsDark } = useThemeMode()

  return (
    <Switch
      checked={isDark}
      onChange={setIsDark}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
    />
  )
}
