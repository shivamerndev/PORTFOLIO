import React from 'react'

const Navbar = () => {

    let loaded = true;

    return <nav className={` relative z-30 flex items-center justify-between px-10 py-7 ${loaded ? 'opacity-100 anim-fade-in' : 'opacity-0'}`}>

        {/* Logo */}
        <div className={` font-black text-sm tracking-widest uppercase text-white ${loaded ? 'opacity-100 anim-slide-left' : 'opacity-0'} `}>
            Shivam Kumar
        </div>

        {/* Nav Links */}
        <div className={`flex gap-16 ${loaded ? 'opacity-100 anim-fade-in' : 'opacity-0'}`}>
            {['Home', 'About', 'Contact'].map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="nav-link text-white/85 text-[15px] font-normal tracking-wide no-underline cursor-pointer">
                {link}
            </a>)}
        </div>

        {/* Toggle */}
        <div className={` toggle-btn relative w-12 h-[26px] rounded-full bg-white cursor-pointer ${loaded ? 'opacity-100 anim-slide-right' : 'opacity-0'} `}>
            <div className="absolute right-1 top-1 w-[18px] h-[18px] rounded-full bg-[#111]" />
        </div>
    </nav>

}

export default Navbar