import React from 'react'
import Start from '../cyclender/Start'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <main className='min-h-full w-full '>
      <Navbar />

      <section>
        <Hero />
      </section>

      <section className='bg-gray-900'>
        <Start />
      </section>

    </main>
  )
}

export default Home