import { NavLink } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

const Navbar = () => {

    const { isDark, toggleTheme } = useTheme()

    return <nav className="relative z-20 flex items-center justify-between px-8 md:px-10 py-6">
        <span className="text-sm md:text-base font-bold tracking-tight uppercase">
            Shivam Verma
        </span>

        <div className={`hidden md:flex items-center gap-10 text-sm font-medium absolute left-1/2 -translate-x-1/2 ${isDark ? 'text-white/90' : 'text-gray-900/90'}`}>
            <NavLink to="/" className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Home</NavLink>
            <NavLink to="/projects" className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Projects</NavLink>
            <NavLink to="/about" className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>About</NavLink>
            <NavLink to="/contact" className={`cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Contact</NavLink>
        </div>

        {/* Theme toggle switch */}
        <button
            onClick={toggleTheme}
            type="button"
            className={`toggle-btn relative w-14 h-7 rounded-full backdrop-blur-sm flex items-center px-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 ${isDark ? 'bg-white/15 border border-white/10 hover:bg-white/25 focus-visible:ring-white/40' : 'bg-black/10 border border-black/15 hover:bg-black/20 focus-visible:ring-black/30'}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Track icons */}
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none select-none" aria-hidden="true">
                🌙
            </span>
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none select-none" aria-hidden="true">
                ☀️
            </span>

            {/* Sliding knob */}
            <span
                className={[
                    'relative z-10 w-5 h-5 rounded-full shadow-md transition-all duration-300 ease-in-out',
                    isDark
                        ? 'translate-x-0 bg-slate-900'
                        : 'translate-x-7 bg-amber-300',
                ].join(' ')}
            />
        </button>
    </nav>

}

export default Navbar