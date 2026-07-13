import { techIcons } from '../utils/icons'
import Bottom from './Bottom'


const Hero = () => {

    return <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col font-sans text-white">

        <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center">

            <div className="absolute inset-0 flex items-center justify-center text-[10vw] leading-none font-bold  uppercase text-white select-none whitespace-nowrap">
                <div className='flex flex-col gap-5'>
                    <h1>
                        Shivam&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Verma
                    </h1>
                    <div className='text-sm w-full bg-black/50  flex justify-between px-4 '>
                        <p>Full Stack Developer</p>
                        <p>passionate learner </p>
                    </div>
                </div>
            </div>

            <figure className="z-10 w-1/2 h-full bg-whit mx-auto relative">

                {techIcons.map((icon) => (
                    <img style={{
                        top: icon.top,
                        left: icon.left,
                        rotate: icon.rotate,
                        zIndex: 1
                    }} key={icon.alt} src={icon.src} alt={icon.alt} className="absolute w-20 opacity-90 drop-shadow-lg" />
                ))}
                <img src="mainimage2.png" alt="Shivam Kumar" className="absolute -top-10 left-0 w-full h-full object-contain" style={{ zIndex: 2 }} />
            </figure>

        </div>

        <Bottom />

    </section>
}

export default Hero