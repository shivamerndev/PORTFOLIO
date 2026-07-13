import React from 'react'

const Navbar = () => {

    return <nav className="relative z-20 flex items-center justify-between px-8 md:px-10 py-6">
        <span className="text-sm md:text-base font-bold tracking-widest uppercase">
            Drama Owns
        </span>

        <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-white/90 absolute left-1/2 -translate-x-1/2">
            <li className="cursor-pointer hover:text-white transition-colors">Home</li>
            <li className="cursor-pointer hover:text-white transition-colors">About</li>
            <li className="cursor-pointer hover:text-white transition-colors">Contact</li>
        </ul>

        {/* Toggle switch */}
        <button
            type="button"
            className="w-12 h-6 rounded-full bg-white/20 flex items-center px-1 justify-end"
            aria-label="Toggle"
        >
            <span className="w-4 h-4 rounded-full bg-white block" />
        </button>
    </nav>

}

export default Navbar