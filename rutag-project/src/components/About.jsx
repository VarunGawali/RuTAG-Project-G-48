import React from 'react'
import aboutImg from '../assets/survey.jpg'
import { HashLink as Link } from 'react-router-hash-link'

const About = () => {
  return (
    <div>
      <div className='px-4 lg:px-14 max-w-screen-2xl mx:auto my-8' id='about'>
        <div className='md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12'>
            <div>
                <img src={aboutImg} alt=""  /></div>
            <div className='md:w-3/5 mx-auto'>
                <h2 className='text-4xl text-neutralDGray font-semibold mb-4 md:w-4/5'>Signs of a Leak</h2>
                <ul className='md:w-3/4 text-sm text-neutralGray mb-8'>
                <li>
                    <h4 className='text-neutralDGray text-xl font-bold'>Unpleasant Odors:</h4>
                    <p className='text-neutralGray text-xl '>● Persistent foul smells around the drain field or septic tank area are often a strong indicator of a leak.</p>
                </li>
                <li>
                    <h4 className='text-neutralDGray text-xl font-bold'>Wet Spots or Lush Patches:</h4>
                    <p className='text-neutralGray text-xl '>● Unexplained wet areas or unusually green and lush patches of grass around the septic tank or drain field could indicate a leak.</p>
                </li>
                <li>
                    <h4 className='text-neutralDGray text-xl font-bold'>Slow Drains:</h4>
                    <p className='text-neutralGray text-xl '>● Drains in the house that are slow to clear or frequently back up might be a sign of a septic system problem.</p>
                </li>
                <li>
                    <h4 className='text-neutralDGray text-xl font-bold'>Mold or Mildew:</h4>
                    <p className='text-neutralGray text-xl '>● Mold or mildew growing indoors around plumbing fixtures might suggest a hidden leak.</p>
                </li>
                </ul>
                <button className='btn-primary'>
  <Link to='#form' smooth={true} duration={500} offset={-100}>File Complaint</Link></button>
            </div>
        </div>
      </div>

      <div className='px-4 lg:px-14 max-w-screen-2xl mx:auto bg-neutralSilver py-16'>
    <div className='flex md:flex-row justify-between items-center gap-8'>
        <div className='md:w-1/2'>
            <h2 className='text-4xl text-neutralDGray font-semibold mb-4 md:w-2/3'>
                Report a <br/><span className='text-brandPrimary'>Drainage Leak</span>
            </h2>
            <p>Help us keep the community safe by reporting any drainage leaks you notice.</p>
        </div>

        <div className='md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around gap-12'>
            <div className='space-y-8'>
                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>

                    <div>
                        <h4 className='text-2xl text-neutralDGray font-semibold'>XX,XXX+</h4>
                        <p>Complaints Filed</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                    <div>
                        <h4 className='text-2xl text-neutralDGray font-semibold'>X,XXX+</h4>
                        <p>Resolved Issues</p>
                    </div>
                </div>
            </div>

            <div className='space-y-8'>
                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                    <div>
                        <h4 className='text-2xl text-neutralDGray font-semibold'>24 Hours</h4>
                        <p>Average Response Time</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

                    <div>
                        <h4 className='text-2xl text-neutralDGray font-semibold'>XXX+</h4>
                        <p>Communities Covered</p>
                    </div>
                </div>
            </div>
        </div>           
    </div>
</div>

    </div>
  )
}

export default About
