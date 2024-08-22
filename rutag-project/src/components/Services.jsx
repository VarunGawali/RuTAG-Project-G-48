import React from 'react'

const Services = () => {

  const services = [
    {id: 1, title: 'Membership Organisations', description: 'Our membership management software provides full automation of membership renewals and payments', image: '/src/assets/icons/11.png'},
    {id: 2, title: 'National Associations', description: 'Our membership management software provides full automation of membership renewals and payments', image: '/src/assets/icons/12.png'},
    {id: 3, title: 'Clubs And Groups', description: 'Our membership management software provides full automation of membership renewals and payments', image: '/src/assets/icons/13.png'}
  ]

  return (
    <div className='md:px-14 px-4 py-16 max-w-screen-2xl mx-auto bg-neutralSilver' id='services'>
      <div className='mt-20 md:w-1/2 mx-auto text-center'>
        <h2 className='text-4xl text-neutralDGray font-semibold mb-2'>
        Manage your entire community in a single system
        </h2>
        <p className='text-neutralGray'>The Agency is suitable for whom?</p>
      </div>
      
      <div className='mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12'>
        {
          services.map(service=> <div key={service.id} className='bg-slate-200 px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md cursor-pointer hover:translate-y-5 hover:border-b-4 hover:border-indigo-700 transition-all duration-300 flex items-center justify-center h-full border-2'>
            <div>
              <div className='bg-[#E8F5E9] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl'><img src={service.image} alt="" className='-ml-5 h-12 w-12' /></div>
              <h4 className='text-2xl font-bold text-neutralDGray mb-2 px-2'>
                {service.title}</h4>
              <p className='text-sm text-neutralGray'>
                {service.description}</p>
            </div>
          </div>)
        }
      </div>
      
    </div>
  )
}

export default Services
