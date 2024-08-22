import React from 'react'
import { Carousel } from 'flowbite-react'
import septic from '../assets/septic.jpg'
import { HashLink as Link } from 'react-router-hash-link';

const Home = () => {
  return (
    <div className='bg-white' id='home'>
      <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen'>
      <Carousel className='w-full mx-auto'>
        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img src={septic} alt="" />
          </div>

          <div className='md:w-1/2'>
  <h1 className='text-5xl font-semibold mb-4 text-neutralDGray md:w-3/4 leading-snug'>
    Addressing Your <span className='text-brandPrimary leading-snug'>Drainage Concerns</span>
  </h1>
  <p className='text-neutralGray text-base mb-8'>
    Our app is dedicated to streamlining the process of registering and managing drainage-related complaints. Whether it's a blocked drain or a severe flooding issue, our platform ensures your concerns are handled promptly and efficiently.
  </p>
  <button className='btn-primary'>
  <Link to='#form' smooth={true} duration={500} offset={-100}>Register your complaint</Link></button>
</div>
        </div>

        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          <div>
            <img src={septic} alt="" />
          </div>

          <div className='md:w-1/2'>
  <h1 className='text-5xl font-semibold mb-4 text-neutralDGray md:w-3/4 leading-snug'>
    Submit Your <span className='text-brandPrimary leading-snug'>Complaint</span>
  </h1>
  <p className='text-neutralGray text-base mb-8'>
    Your feedback is important to us. Please fill out the form below to register your complaint and help us improve.
  </p>
  <button className='btn-primary'>
  <Link to='#form' smooth={true} duration={500} offset={-100}>File a complaint</Link></button>
</div>
        </div>
      </Carousel>
      </div>
    </div>
  )
}

export default Home