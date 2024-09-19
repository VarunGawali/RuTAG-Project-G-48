import { useRef, useState } from 'react';
import Map from './Map';
import 'leaflet/dist/leaflet.css';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';

const Contact = () => {
  const { user } = useUser();
  const form = useRef();
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [address, setAddress] = useState('New Delhi');

  // Mutation to send complaint
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('https://ru-tag-project-g-48-mw2m.vercel.app/api/complaints/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }
      return response.json();
    },
    onSuccess: (result) => {
      console.log('Complaint submitted successfully:', result);
      // Reset form and state after successful submission
      form.current.reset();
      setMarkerPosition(null);
      setSelectedImages([]);
    },
    onError: (error) => {
      console.error('Error submitting complaint:', error);
    },
  });

  const sendComplaint = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    if (markerPosition) {
      formData.append('latitude', markerPosition.lat);
      formData.append('longitude', markerPosition.lng);
      formData.append('address', address);
    }

    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    formData.append('userId', user.id);

    mutation.mutate(formData);
  };

  const handleMapClick = async (latlng) => {
    setMapCenter([latlng.lat, latlng.lng]);
    setMarkerPosition(latlng);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
      const data = await response.json();

      if (data && data.address) {
        const fullAddress = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.state || ''}, ${data.address.country || ''}`;
        setAddress(fullAddress);
        console.log('Address:', fullAddress);
      } else {
        console.warn('No address found for this location.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
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
          <div>
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
        </div>

        <div>
          <h3 className="text-2xl text-neutralDGray font-semibold mb-4">
            Write your complaint
          </h3>

          <form ref={form} onSubmit={sendComplaint} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Address
              </label>
              <Map center={mapCenter} zoom={15} onMapClick={handleMapClick} />
              {markerPosition && (
                <div>
                  <p>Selected Location: Latitude {markerPosition.lat}, Longitude {markerPosition.lng}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutralDGray mb-2">
                Complaint
              </label>
              <textarea name="complaint" cols='30' rows='5' placeholder='Enter your complaint' className="w-full border border-neutralGray rounded-md p-2 focus:outline-none focus:border-brandPrimary"></textarea>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`upload-${index}`} className="w-full h-24 object-cover rounded-md shadow-sm" />
                </div>
              ))}
            </div>

            <div className='flex items-center justify-center m-2'>
              <label className="w-36 h-15 py-2 px-1 inline-flex cursor-pointer rounded-md items-center text-center text-sm gap-1 justify-center bg-gray-300 shadow-sm border border-gray-200 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div>Upload Images</div>
                <input type="file" className="hidden" 
                name='images'
                multiple onChange={handleImageChange}/>
              </label>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-brandPrimary text-white py-2 px-4 rounded-md hover:bg-brandPrimary-dark">
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;





//AIzaSyB3-l14Daw7RDkUiBOVFCvlNLp6DdWvvnk



