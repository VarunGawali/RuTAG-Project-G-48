

import { useRef } from 'react';
import emailjs from 'emailjs-com'; // Ensure emailjs is installed and imported

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bdz5j0y', 'template_jja181e', form.current, {
      publicKey: 'sJXj6_juZ4360Un9y',
    })
    .then(() => {
      e.target.reset();
    })
    .catch((err) => {
      console.error('Failed to send email:', err);
    });
  };

  return (
    <section className='px-4 lg:px-14 max-w-screen-2xl mx-auto my-0 bg-neutralSilver pt-14 pb-20' id='form'>
      <h2 className='text-4xl text-neutralDGray font-semibold mb-4 text-center'>
        Register your Complaint
      </h2>
      <span className='text-sm text-neutralGray mb-8 block text-center'>
        Contact Me
      </span>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl text-neutralDGray font-semibold mb-4">
            Contact us
          </h3>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="bx bx-mail-send text-2xl text-brandPrimary mb-2"></i>
              <h3 className="text-xl text-neutralDGray font-semibold mb-1">Email</h3>
              <span className="text-neutralGray">abcd@gmail.com</span>
              <a href="mailto:varungawali47@gmail.com" className="text-brandPrimary hover:text-neutral-700 flex items-center mt-2">
                Write us
                <svg
                  className="ml-1"
                  width="25"
                  height="25"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.02324 6.24222L7.12263 5.14283C7.25301 5.01245 7.25301 4.80106 7.12263 4.67068L6.02324 3.57129M7.02484 4.90676L2.35071 4.90676" stroke="#4CAF4F" strokeWidth="0.5008" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="bx bxl-whatsapp text-2xl text-brandPrimary mb-2"></i>
              <h3 className="text-xl text-neutralDGray font-semibold mb-1">Whatsapp</h3>
              <span className="text-neutralGray">8624XXXXXX</span>
              <a href="https://api.whatsapp.com/send?phone=8624999432&text=Hello, more information!" className="text-brandPrimary hover:text-neutral-700 flex items-center mt-2">
                Write us
                <svg
                  className="ml-1"
                  width="25"
                  height="25"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.02324 6.24222L7.12263 5.14283C7.25301 5.01245 7.25301 4.80106 7.12263 4.67068L6.02324 3.57129M7.02484 4.90676L2.35071 4.90676" stroke="#4CAF4F" strokeWidth="0.5008" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <i className="bx bxl-twitter text-2xl text-brandPrimary mb-2"></i>
              <h3 className="text-xl text-neutralDGray font-semibold mb-1">X</h3>
              <span className="text-neutralGray">@RuTAGProject</span>
              <a href="" className="text-brandPrimary hover:text-neutral-700 flex items-center mt-2">
                Write us
                <svg
                  className="ml-1"
                  width="25"
                  height="25"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.02324 6.24222L7.12263 5.14283C7.25301 5.01245 7.25301 4.80106 7.12263 4.67068L6.02324 3.57129M7.02484 4.90676L2.35071 4.90676" stroke="#4CAF4F" strokeWidth="0.5008" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl text-neutralDGray font-semibold mb-4">
            Write your complaint
          </h3>

          <form ref={form} onSubmit={sendEmail} className="bg-white p-6 rounded-lg shadow-lg">
            <div className='grid grid-cols-2 gap-4'>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Name
              </label>
              <input type="text" name='name' className='w-full border rounded-lg px-4 py-2 text-neutralDGray' placeholder='Insert your name' />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Email
              </label>
              <input type="email" name='email' className='w-full border rounded-lg px-4 py-2 text-neutralDGray' placeholder='Insert your Email' />
            </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Address
              </label>
              <input type="text" name='name' className='w-full border rounded-lg px-4 py-2 text-neutralDGray' placeholder='Insert your address' />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Complaint
              </label>
              <textarea name="project" cols='30' rows='10' className='w-full border rounded-lg px-4 py-2 text-neutralDGray' placeholder='Write your complaint'></textarea>
            </div>
            <div className='flex gap-4'>
            <button type="submit" className="btn-primary flex items-center">
              Submit
            </button>
            <button
  type="submit"
  className="flex items-center border border-black px-4 py-2 rounded-md hover:bg-brandPrimaryDark"
>
  + Add Photos
</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

