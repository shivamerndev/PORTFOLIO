import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/**
 * Custom hook to access and control the app theme.
 *
 * Returns:
 *   - isDark      : boolean — true when dark mode is active
 *   - toggleTheme : () => void — toggles between dark and light
 *   - setTheme    : (mode: 'dark' | 'light') => void — set a specific mode
 *   - theme       : 'dark' | 'light' — current theme string
 */
const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within a <ThemeProvider>')
    }

    const { isDark, toggleTheme, setTheme } = context

    return {
        isDark,
        theme: isDark ? 'dark' : 'light',
        toggleTheme,
        setTheme,
    }
}

export default useTheme
