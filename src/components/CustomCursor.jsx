import { useEffect, useRef } from 'react'


const CustomCursor = () => {


  const cursorRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)


  const animate = () => {

    current.current.x += (pos.current.x - current.current.x) * 0.12
    current.current.y += (pos.current.y - current.current.y) * 0.12

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`
    }

    rafId.current = requestAnimationFrame(animate)
  }


  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])


  return (
    <div ref={cursorRef} className='fixed top-0 left-0 w-6 h-6 z-90 -ml-1 -mt-1 mix-blend-difference' style={{ pointerEvents: 'none', willChange: 'transform' }}>
      <img src="/cursor.png" alt="" className='w-full rotate-15 h-full object-contain select-none'
        style={{ draggable: false, filter: 'invert(1) drop-shadow(0 0 6px rgba(255, 255, 255, 0.51))' }}
        draggable={false} />
    </div>
  )
}

export default CustomCursor