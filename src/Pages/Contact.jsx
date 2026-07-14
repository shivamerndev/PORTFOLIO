import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar'
import '../styles/hero.css'
import '../styles/contact.css'

/* ── Contact info data ──────────────────────────────────────────────── */
const INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'shivam@example.com',
    href: 'mailto:shivam@example.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    value: 'India — Open to Remote',
    href: null,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
]

const SOCIALS = [
  {
    name: 'GitHub',
    handle: '@shivamverma',
    href: 'https://github.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Shivam Verma',
    href: 'https://linkedin.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@shivam.dev',
    href: 'https://instagram.com/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    handle: 't.me/Drama_Owns_Official',
    href: 'https://t.me/Drama_Owns_Official',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 100 12a12 12 0 0011.944-12zm3.883 8.24l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.16 14.238l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.921.34z" />
      </svg>
    ),
  },
]

/* ── Component ──────────────────────────────────────────────────────── */
const Contact = () => {
  const pageRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)
  const socialsRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  /* ── Entrance animations ────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo(headingRef.current,
        { y: 60, opacity: 0, letterSpacing: '0.25em' },
        { y: 0, opacity: 1, letterSpacing: '-0.01em', duration: 1.1 }
      )
        .fromTo(subRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.55'
        )
        .fromTo(infoRef.current?.children ?? [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(formRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(socialsRef.current?.children ?? [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          '-=0.4'
        )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Form submit ────────────────────────────────────────────────── */
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async send
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1400)
  }

  return (
    <div ref={pageRef} className="relative min-h-screen w-full bg-black text-white overflow-x-hidden font-sans">

      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
        {/* Floating dots */}
        <span className="dot-1 absolute top-[18%] left-[8%] w-2 h-2 rounded-full bg-white/40 block" />
        <span className="dot-2 absolute top-[55%] left-[4%] w-1.5 h-1.5 rounded-full bg-white/30 block" />
        <span className="dot-3 absolute top-[30%] right-[6%] w-2.5 h-2.5 rounded-full bg-white/25 block" />
      </div>

      <Navbar />

      {/* ── Main content ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-24">

        {/* ── Page heading ── */}
        <header className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">Get In Touch</p>
          <h1
            ref={headingRef}
            style={{ opacity: 0 }}
            className="text-[clamp(48px,9vw,120px)] font-black uppercase leading-[0.88] tracking-tight"
          >
            Contact<br />
            <span className="text-white/20">Me.</span>
          </h1>
          <p
            ref={subRef}
            style={{ opacity: 0 }}
            className="mt-6 text-base md:text-lg text-white/50 max-w-lg leading-relaxed"
          >
            Whether you have a project in mind, a question, or just want to say hello —
            I&rsquo;d love to hear from you. Let&rsquo;s build something great together.
          </p>
        </header>

        {/* ── Divider ── */}
        <div className="divider-line h-px w-full bg-white/20 mb-14" />

        {/* ── 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── LEFT: Info + Socials ── */}
          <aside className="flex flex-col gap-10">

            {/* Info cards */}
            <div ref={infoRef} className="grid grid-cols-1 gap-4">
              {INFO.map((item) => (
                <div key={item.label} className="info-card rounded-2xl p-5 backdrop-blur-sm flex items-start gap-4">
                  <span className="mt-0.5 text-white/60 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-white/35 mb-1">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-sm md:text-base text-white hover:text-white/70 transition-colors">{item.value}</a>
                      : <p className="text-sm md:text-base text-white">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/35 mb-4">Find Me On</p>
              <ul ref={socialsRef} className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill flex items-center gap-4 rounded-xl px-5 py-3.5 backdrop-blur-sm"
                    >
                      <span className="text-white/70 shrink-0">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{s.name}</p>
                        <p className="text-xs text-white/40 truncate">{s.handle}</p>
                      </div>
                      <svg className="text-white/30 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* ── RIGHT: Contact form ── */}
          <section>
            <div ref={formRef} style={{ opacity: 0 }} className="info-card rounded-3xl p-8 md:p-10 backdrop-blur-sm">

              {sent ? (
                /* Success state */
                <div className="success-msg flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">Message Sent!</h2>
                    <p className="text-sm text-white/50">I&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="mb-2">
                    <h2 className="text-lg font-bold tracking-tight">Send a Message</h2>
                    <p className="text-xs text-white/35 mt-1">All fields are required.</p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[11px] tracking-[0.18em] uppercase text-white/40">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Shivam Verma"
                        value={form.name}
                        onChange={handleChange}
                        className="contact-input rounded-xl px-4 py-3 text-sm w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[11px] tracking-[0.18em] uppercase text-white/40">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="contact-input rounded-xl px-4 py-3 text-sm w-full"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-[11px] tracking-[0.18em] uppercase text-white/40">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Project inquiry / Collaboration / Hiring…"
                      value={form.subject}
                      onChange={handleChange}
                      className="contact-input rounded-xl px-4 py-3 text-sm w-full"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[11px] tracking-[0.18em] uppercase text-white/40">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your project or idea…"
                      value={form.message}
                      onChange={handleChange}
                      className="contact-input rounded-xl px-4 py-3 text-sm w-full resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn rounded-xl px-8 py-4 text-sm flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0110 10" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </section>

        </div>

        {/* ── Bottom note ── */}
        <div className="divider-line h-px w-full bg-white/10 mt-20 mb-8" />
        <p className="text-center text-xs tracking-widest uppercase text-white/25">
          Shivam Verma &mdash; Full Stack Developer &mdash; Open to Opportunities
        </p>

      </main>
    </div>
  )
}

export default Contact