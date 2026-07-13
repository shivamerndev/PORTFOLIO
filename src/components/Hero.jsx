import { useEffect, useRef, useState } from 'react'

const Hero = () => {

    const [loaded, setLoaded] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const heroRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100)
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const parallaxOffset = scrollY * 0.3

    return (
        <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col font-sans">

            {/* ── BIG BACKGROUND TEXT ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-[5]" style={{ transform: `translateY(${parallaxOffset}px)` }}>
                {/* Row 1 */}
                <div className={` flex w-full justify-between px-[2vw] ${loaded ? 'opacity-100 anim-big-text-1' : 'opacity-0'}`}>
                    <span className="big-text">SHIVAM</span>
                    <span className="big-text">KUMAR</span>
                </div>

                {/* Spacer for profile image */}
                <div className="h-[clamp(40px,8vw,90px)]" />

                {/* Row 2 */}
                <div className={`flex w-full justify-between px-[2vw] ${loaded ? 'opacity-100 anim-big-text-2' : 'opacity-0'}`}>
                    <span className="big-text-sm">FULL‑STACK</span>
                    <span className="big-text-sm">DEVELOPER</span>
                </div>
            </div>

            {/* ── PROFILE IMAGE ── */}
            <img src="/profile.jpg" alt="Shivam Kumar" className={`profile-img z-10 ${loaded ? 'anim-scale-in' : 'opacity-0'}`} style={{ transform: `translateX(-50%) translateY(${parallaxOffset * -0.2}px)` }} />

            {/* ── BOTTOM BAR ── */}
            <div className={` absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-10 pb-8 ${loaded ? 'opacity-100 anim-fade-in-up' : 'opacity-0'}`}>
                {/* Bottom-Left: socials + subtitle */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        {/* Instagram */}
                        <a href="#" aria-label="Instagram" className="social-icon w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white/70 no-underline">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a href="#" aria-label="GitHub" className="social-icon w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white/70 no-underline">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="#" aria-label="LinkedIn" className="social-icon w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white/70 no-underline">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    <p className="text-white/65 text-[13px] font-normal tracking-wide m-0">
                        Building Modern Web Experiences
                    </p>
                </div>

                {/* Bottom-Right */}
                <div className="text-right">
                    <p className="text-white/65 text-[13px] font-normal tracking-wide m-0">
                        Presented By: Shivam Kumar
                    </p>
                    <p className="text-white/45 text-xs font-light tracking-wider mt-1">
                        github.com/shivamerndev
                    </p>
                </div>
            </div>

            {/* ── RADIAL VIGNETTE ── */}
            <div
                className="absolute inset-0 z-[8] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
                }}
            />

            {/* ── BOTTOM FADE ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-44 z-[9] pointer-events-none"
                style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
            />
        </section>
    )
}

export default Hero