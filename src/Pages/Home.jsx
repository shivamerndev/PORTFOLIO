import { useEffect, useRef } from 'react'
import Start from '../cyclender/Start'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Projects from '../components/Projects'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {

  const containerRef = useRef(null)


  useEffect(() => {
    const el = containerRef.current
    if (!el) return

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

    const lenis = locoScroll.lenisInstance

    if (lenis) {
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

      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.addEventListener('refresh', () => lenis.emit('scroll', { scroll: lenis.scroll }))
    } else {
      ScrollTrigger.refresh()
    }

    ScrollTrigger.refresh()

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

    <section className='h-screen w-full sticky top-0' id='hero-section'>
      <Hero />
    </section>

    <section className='h-screen sticky top-[45vh] z-10 w-full bg-gray-900 mt-10'>
      <Projects />
      <Projects />
      <Projects />  
    </section>

  </main>
}

export default Home