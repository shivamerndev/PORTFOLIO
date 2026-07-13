import { useEffect, useRef } from 'react'
import Start from '../cyclender/Start'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {

  const containerRef = useRef(null)


  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // ── Locomotive Scroll v5 ──────────────────────────────────────────
    // v5 no longer uses the v4 API (no .on(), no .scroll.instance.scroll.y)
    // Instead, v5 exposes a Lenis instance via locoScroll.lenisOptions
    // and emits native scroll events on the window/element.
    const locoScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: el,
        content: el,
        lerp: 0.07,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      },
    })

    // ── Bridge loco v5 → GSAP ScrollTrigger ──────────────────────────
    // In v5, the internal Lenis instance is at locoScroll.lenisInstance (or lenis)
    const lenis = locoScroll.lenisInstance

    if (lenis) {
      // Tell GSAP ScrollTrigger to use the Lenis scroll position
      ScrollTrigger.scrollerProxy(window, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
        },
      })

      // Keep ScrollTrigger in sync with Lenis scroll events
      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.addEventListener('refresh', () => lenis.emit('scroll', { scroll: lenis.scroll }))
    } else {
      // Fallback: use native window scroll if lenis isn't accessible
      ScrollTrigger.refresh()
    }

    ScrollTrigger.refresh()

    // ── Section 2 (Start) scroll-in animation ─────────────────────────
    gsap.fromTo(
      '#start-section',
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#start-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      if (lenis) lenis.off('scroll', ScrollTrigger.update)
      locoScroll.destroy()
    }
  }, [])


  return <main ref={containerRef} data-scroll-container className='h-full w-full overflow-hidden'>

    <Navbar />

    <section data-scroll-section className='h-screen w-full' id='hero-section'>
      <Hero />
    </section>

    <section data-scroll-section className='h-screen w-full bg-gray-900' id='start-section'>
      <Start />
    </section>

  </main>
}

export default Home