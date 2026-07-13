import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { techIcons } from '../utils/icons'
import '../styles/hero.css'


const Hero = () => {

    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const figureRef = useRef(null)
    const iconsRef = useRef([])
    const socialRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            // ── 1. Title slides up from below + letter-spacing collapses ──
            tl.fromTo(
                titleRef.current,
                { y: 80, opacity: 0, letterSpacing: '0.35em' },
                { y: 0, opacity: 1, letterSpacing: '-0.01em', duration: 1.2 }
            )

                // ── 2. Subtitle fades in ──────────────────────────────────────
                .fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.5'
                )

                // ── 3. Figure / main image scales up from slightly smaller ────
                .fromTo(
                    figureRef.current,
                    { scale: 0.88, opacity: 0, y: 40 },
                    { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
                    '-=0.9'
                )

                // ── 4. Tech icons stagger in from random directions ───────────
                .fromTo(
                    iconsRef.current,
                    { scale: 0, opacity: 0, rotation: (i) => (i % 2 === 0 ? -30 : 30) },
                    {
                        scale: 1, opacity: 0.9, rotation: 0,
                        duration: 0.6,
                        stagger: { amount: 0.9, from: 'random' },
                        ease: 'back.out(1.7)',
                    },
                    '-=0.6'
                )

                // ── 5. Social panel slides up from bottom ─────────────────────
                .fromTo(
                    socialRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                    '-=0.4'
                )
        }, sectionRef)

        // ── Continuous floating animation for icons ───────────────────
        iconsRef.current.forEach((el, i) => {
            if (!el) return
            gsap.to(el, {
                y: `${i % 2 === 0 ? -10 : 10}`,
                duration: 2 + i * 0.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.15,
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative w-full h-full overflow-hidden bg-black flex flex-col font-sans text-white">

            <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center">


                <div className="absolute inset-0 flex items-center justify-center text-[10vw] leading-none font-bold uppercase text-white select-none whitespace-nowrap">
                    <div className='flex flex-col gap-5'>
                        <h1 ref={titleRef} style={{ opacity: 0 }}>
                            Shivam&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Verma
                        </h1>
                        <div ref={subtitleRef} className='text-sm w-full bg-black/50 flex justify-between px-4' style={{ opacity: 0 }}>
                            <p>Full Stack Developer</p>
                            <p>passionate learner</p>
                        </div>
                    </div>
                </div>


                <figure ref={figureRef} className="z-10 w-1/2 h-full mx-auto relative" style={{ opacity: 0 }}>
                    {techIcons.map((icon, i) => (
                        <img style={{
                            top: icon.top,
                            left: icon.left,
                            rotate: icon.rotate,
                            zIndex: 1,
                            opacity: 0,
                            willChange: 'transform',
                        }} key={icon.alt} ref={el => (iconsRef.current[i] = el)} src={icon.src} alt={icon.alt} className="absolute w-20 drop-shadow-lg cursor-pointer" />
                    ))}

                    <img src="mainimage2.png" alt="Shivam Kumar" className="absolute -top-10 left-0 w-full h-full object-contain" style={{ zIndex: 2 }} />
                </figure>


                <div ref={socialRef} className="absolute z-50 bottom-0 left-0 h-1/2 w-1/2 flex items-center justify-center" style={{ opacity: 0 }}>
                    <div className="h-3/4 w-1/2 bg-white/5 rounded-xl backdrop-blur-md flex items-center justify-center text-xl">
                        <ul className="flex flex-col gap-5">
                            {
                                ['Instagram', 'LinkedIn', 'Github'].map((name) => (
                                    <li key={name} className="cursor-pointer transition-all duration-300 hover:text-white/60 hover:translate-x-2">
                                        {name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero