import React from 'react'

const CasesSolved = () => {
  const cases = [
      { id: 1, title: 'Drainage Issue Resolved', description: 'Successfully addressed a severe drainage problem in a residential area.', image: '/src/assets/case11.webp' },
      { id: 2, title: 'Public Sewer Line Fix', description: 'Fixed a major leak in the public sewer line, preventing contamination and ensuring smooth sewage disposal.', image: '/src/assets/case2.webp' },
      { id: 3, title: 'Commercial Drain Upgrade', description: 'Upgraded the drainage system for a commercial property.', image: '/src/assets/case3.jpg' },
  ];

  return (
      <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto mt-12 mb-24 bg-neutralSilver pt-5 pb-24' id='cases'>
          <div className='text-center md:w-1/2 mx-auto'>
              <h2 className='text-4xl text-neutralDGray font-semibold mb-4'>Cases Solved</h2>
              <p className='md:w-3/4 text-sm text-neutralGray mb-8 mx-auto'>
                  Our team has successfully resolved numerous drainage issues. Here are a few examples of the cases we've handled, demonstrating our commitment to effective solutions.
              </p>
          </div>

          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 sm:gap-12 gap-20 items-center justify-between'>
              {cases.map(caseItem => (
                  <div key={caseItem.id} className='mx-auto relative mb-12 cursor-pointer'>
                      <img 
                          src={caseItem.image} 
                          alt={caseItem.title} 
                          className='hover:scale-95 transition-all duration-300 object-cover w-[300px] h-[200px] rounded-md' 
                      />
                      <div className='text-center px-4 py-8 bg-white shadow-lg rounded-md md:w-3/4 w-[250px] h-[200px] mx-auto absolute left-0 right-0 bottom-0 translate-y-2/3 flex flex-col justify-between'>
                      <div className='overflow-y-auto h-[80px]'>
                          <h3 className='mb-3 text-neutralGray font-semibold'>{caseItem.title}</h3>
                          <p className='text-neutralGray'>{caseItem.description}</p>
                      </div>
                        <div className='mt-2 text-center'>
                              <a className='font-bold text-brandPrimary hover:text-neutral-700' href="/">
                                  Read More
                                  <svg
                                      className='inline-block hover:text-neutral-700 mt-0 ml-1 mb-1'
                                      width="25" height="35" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6.02324 6.24222L7.12263 5.14283C7.25301 5.01245 7.25301 4.80106 7.12263 4.67068L6.02324 3.57129M7.02484 4.90676L2.35071 4.90676" stroke="#4CAF4F" strokeWidth="0.5008" strokeLinecap="round"/>
                                  </svg>
                              </a>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default CasesSolved;


