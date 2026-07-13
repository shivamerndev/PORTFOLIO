import { useState } from 'react'

const Hero = () => {

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col font-sans">


            <figure className='z-10 w-1/2 mx-auto relative'>
                <img src="/profile.jpg" alt="Shivam Kumar"  className='absolute top-0 left-0' />
            </figure>

        </section>
    )
}

export default Hero