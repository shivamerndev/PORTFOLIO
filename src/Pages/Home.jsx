import { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Projects from '../components/Projects'

gsap.registerPlugin(ScrollTrigger)

const projectList = [
  {
    title: 'Modern Portfolio',
    description: 'A refined portfolio experience with immersive motion and clear storytelling that highlights the work in a calm, premium layout.',
    image: 'profile.jpg',
    tags: ['React', 'GSAP', 'UI Design'],
  },
  {
    title: 'Creative Studio',
    description: 'A brand-led landing experience designed to guide visitors through a series of product stories without overwhelming the screen.',
    image: 'profile.jpg',
    tags: ['Framer Motion', 'Tailwind', 'Animation'],
  },
  {
    title: 'Interactive Showcase',
    description: 'An experience that lets each project step into focus one at a time, creating a more intentional browsing rhythm.',
    image: 'profile.jpg',
    tags: ['Scroll', 'Responsive', 'Storytelling'],
  },
]

// Given a project's index and the currently active index, decide which
// "slot" it occupies on screen. Because every project keeps the same DOM
// node across renders (keyed by title), swapping roles animates smoothly
// instead of snapping.
const getRole = (index, activeIndex, length) => {
  const offset = (index - activeIndex + length) % length
  if (offset === 0) return 'active'
  if (offset === 1) return 'next'
  if (offset === length - 1) return 'prev'
  return 'hidden'
}

const Home = () => {

  const containerRef = useRef(null)
  const workSectionRef = useRef(null)
  const workHeadingRef = useRef(null)
  const workSubtitleRef = useRef(null)
  const workLineRef = useRef(null)
  const workContainerRef = useRef(null)
  const workCounterRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)
  const scrollHintRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isFirstRender = useRef(true)

  const goNext = () => setActiveIndex((prev) => (prev + 1) % projectList.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + projectList.length) % projectList.length)

  const handleWheel = (event) => {
    event.preventDefault()
    if (event.deltaY > 0) goNext()
    else if (event.deltaY < 0) goPrev()
  }

  // Keyboard navigation for the showcase
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') goNext()
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Small pulse on the counter whenever the active project changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!workCounterRef.current) return
    gsap.fromTo(
      workCounterRef.current,
      { scale: 0.85, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    )
  }, [activeIndex])

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

    /* ─── Selected Work Section Animations ─── */
    const workSection = workSectionRef.current
    if (workSection) {
      const workTl = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animated gradient accent line — grows from left
      workTl.fromTo(
        workLineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
        0
      )

      // Subtitle slides up with fade
      workTl.fromTo(
        workSubtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.15
      )

      // Heading — each word clips in
      workTl.fromTo(
        workHeadingRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power4.out' },
        0.3
      )

      // Counter number animate
      workTl.fromTo(
        workCounterRef.current,
        { opacity: 0, scale: 0.5, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' },
        0.5
      )

      // Project container — cinematic clip-path reveal
      workTl.fromTo(
        workContainerRef.current,
        { clipPath: 'inset(10% 10% 10% 10% round 2rem)', opacity: 0, scale: 0.92 },
        { clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        0.45
      )

      // Scroll hint pulse
      workTl.fromTo(
        scrollHintRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.0
      )

      // Floating orbs — parallax on scroll
      gsap.to(orb1Ref.current, {
        y: -120,
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(orb2Ref.current, {
        y: -80,
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      gsap.to(orb3Ref.current, {
        y: -160,
        x: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: workSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Ambient glow pulse on orbs (infinite)
      gsap.to(orb1Ref.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(orb2Ref.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      })

      gsap.to(orb3Ref.current, {
        scale: 1.4,
        opacity: 0.4,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      })
    }

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

    <section ref={workSectionRef} className='relative z-10 w-full overflow-hidden bg-slate-950 py-20 sm:py-28'>

      {/* Ambient floating orbs */}
      <div ref={orb1Ref} className='pointer-events-none absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl' />
      <div ref={orb2Ref} className='pointer-events-none absolute right-[10%] top-[35%] h-72 w-72 rounded-full bg-violet-400/15 blur-3xl' />
      <div ref={orb3Ref} className='pointer-events-none absolute left-[20%] bottom-[8%] h-56 w-56 rounded-full bg-sky-400/15 blur-3xl' />

      <div className='relative mx-auto mb-14 max-w-3xl px-6 text-center sm:mb-20'>
        <div ref={workLineRef} className='mx-auto h-px w-16 bg-gradient-to-r from-transparent via-cyan-300 to-transparent' />
        <p ref={workSubtitleRef} className='mt-5 text-sm uppercase tracking-[0.4em] text-cyan-300'>
          Selected Work
        </p>
        <h2 ref={workHeadingRef} className='mt-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl'>
          Projects that turn scrolling into a story
        </h2>
        <p ref={scrollHintRef} className='mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400'>
          Scroll or use the arrow keys to explore
        </p>
      </div>

      <div className='relative flex justify-center'>
        <div
          ref={workContainerRef}
          onWheel={handleWheel}
          tabIndex={0}
          className='relative flex h-[78vh] min-h-140 w-full max-w-6xl items-center justify-center overflow-hidden rounded-4xl border border-white/10 p-4 outline-none sm:p-6'
          style={{
            background: 'linear-gradient(145deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 50%, rgba(15,23,42,0.95) 100%)',
            boxShadow: '0 0 80px rgba(34,211,238,0.06), 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >

          {projectList.map((project, index) => (
            <Projects
              key={project.title}
              project={project}
              index={index}
              role={getRole(index, activeIndex, projectList.length)}
            />
          ))}

          {/* Counter */}
          <div ref={workCounterRef} className='absolute bottom-6 left-6 z-40 flex items-baseline gap-1 font-mono text-white sm:bottom-8 sm:left-8'>
            <span className='text-xl font-semibold text-cyan-300 sm:text-2xl'>0{activeIndex + 1}</span>
            <span className='text-sm text-slate-400'>/ 0{projectList.length}</span>
          </div>

          {/* Prev / next controls */}
          <div className='absolute bottom-6 right-6 z-40 flex gap-2 sm:bottom-8 sm:right-8'>
            <button
              type='button'
              onClick={goPrev}
              aria-label='Previous project'
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/10'
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M13 8H3M7 4L3 8l4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
            <button
              type='button'
              onClick={goNext}
              aria-label='Next project'
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/10'
            >
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>

          {/* Dot navigation rail */}
          <div className='absolute left-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:left-8'>
            {projectList.map((project, index) => (
              <button
                key={project.title}
                type='button'
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${project.title}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'h-6 bg-cyan-300'
                  : 'bg-white/25 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>

        </div>
      </div>

    </section>

  </main>
}

export default Home