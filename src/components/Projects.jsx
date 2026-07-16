import React from 'react'

const roleStyles = {
    active: 'z-30 left-auto right-[3%] top-1/2 -translate-y-1/2 scale-100 opacity-100 pointer-events-auto',
    prev: 'z-10 left-[18%] top-[6%] scale-[0.88] opacity-60 pointer-events-none md:left-[24%]',
    next: 'z-10 left-[18%] bottom-[6%] scale-[0.88] opacity-60 pointer-events-none md:left-[24%]',
    hidden: 'z-0 left-[18%] top-[6%] scale-[0.7] opacity-0 pointer-events-none md:left-[24%]',
}

const Projects = ({ project, index, role }) => {
    const isActive = role === 'active'

    return (
        <article
            className={`absolute w-[min(76vw,500px)] rounded-[2rem] border p-6 shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 lg:p-10 ${roleStyles[role]} ${isActive
                ? 'border-cyan-400/40 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-950/95'
                : 'border-white/10 bg-slate-800/70'
                }`}
        >
            {/* Corner accent — only on the active card */}
            {isActive && (
                <span className='pointer-events-none absolute -right-px -top-px h-16 w-16 rounded-tr-[2rem] border-r-2 border-t-2 border-cyan-300/50' />
            )}

            <div className='flex flex-col gap-6 lg:flex-row lg:items-center'>
                <figure className='relative w-full max-w-[240px] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl'>
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`h-[200px] w-full object-cover transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-105'}`}
                    />
                    <span className='absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent' />
                </figure>

                <div className='flex-1 text-white'>
                    <div className='flex items-center gap-3'>
                        <p className='text-sm uppercase tracking-[0.35em] text-cyan-300'>
                            Project 0{index + 1}
                        </p>
                        {isActive && <span className='h-px flex-1 bg-gradient-to-r from-cyan-300/60 to-transparent' />}
                    </div>

                    <h3 className='mt-3 text-2xl font-semibold sm:text-3xl'>{project.title}</h3>

                    <p className='mt-4 text-sm leading-7 text-slate-300 sm:text-base'>
                        {project.description}
                    </p>

                    <div className='mt-5 flex flex-wrap gap-2'>
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className='rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {isActive && (
                        <button
                            type='button'
                            className='group mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition-colors hover:text-cyan-100'
                        >
                            View project
                            <svg
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                                fill='none'
                                className='transition-transform duration-300 group-hover:translate-x-1'
                            >
                                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Projects