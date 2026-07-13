import React from 'react'

const Navbar = () => {

    return <nav className="relative z-30 flex items-center justify-between px-10 py-7">

        <div className={` font-black text-sm tracking-widest uppercase text-white`}>
            Shivam Kumar
        </div>

        {/* Nav Links */}
        <div className={`flex gap-16`}>
            {['Home', 'About', 'Contact'].map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="nav-link text-white/85 text-[15px] font-normal tracking-wide no-underline cursor-pointer">
                {link}
            </a>)}
        </div>

        {/* Toggle */}
        <div className={` toggle-btn relative w-12 h-[26px] rounded-full bg-white cursor-pointer`}>
            <div className="absolute right-1 top-1 w-[18px] h-[18px] rounded-full bg-[#111]" />
        </div>
    </nav>

}

export default Navbar