import { useState, useEffect, useCallback, createContext } from 'react'

export const ThemeContext = createContext()

const STORAGE_KEY = 'portfolio-theme'

/**
 * ThemeProvider
 * - Persists theme to localStorage
 * - Syncs the `dark` / `light` class on <html> for Tailwind dark-mode
 * - Sets CSS custom properties on :root for non-Tailwind styles
 * - Respects system preference on first visit (prefers-color-scheme)
 */
const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // 1. Check localStorage first
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored !== null) return stored === 'dark'

        // 2. Fall back to OS preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // Sync <html> class + CSS custom properties whenever isDark changes
    useEffect(() => {
        const root = document.documentElement

        if (isDark) {
            root.classList.add('dark')
            root.classList.remove('light')
        } else {
            root.classList.add('light')
            root.classList.remove('dark')
        }

        // Persist
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    }, [isDark])

    // Listen for OS preference changes (e.g. system dark-mode toggle)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')

        const handler = (e) => {
            // Only follow system if user hasn't explicitly chosen
            const stored = localStorage.getItem(STORAGE_KEY)
            if (!stored) setIsDark(e.matches)
        }

        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const toggleTheme = useCallback(() => {
        setIsDark(prev => !prev)
    }, [])

    const setTheme = useCallback((mode) => {
        setIsDark(mode === 'dark')
    }, [])

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider