import { ConfigProvider, theme } from 'antd'
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react'

interface ThemeContextProps {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used inside ThemeProvider')
  }
  return context
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false)

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
