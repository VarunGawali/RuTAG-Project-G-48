import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import CasesSolved from './components/Cases'
import Contact from './components/Form'
import { Routes, Route } from 'react-router-dom'

import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import ComplaintsTable from './components/InspectionSchedule'
import ComplaintTimeline from './components/ComplaintTimeline'

function App() {

  return (
    <>
    <SignedIn>
      <Routes>
        <Route path="/" element={<>
          <Navbar/>
          <Home/>
          <CasesSolved/>
          <About/>
          <ComplaintsTable/>
          <Contact/>
        </>}/>
        <Route path="/complaints/:id" element={<ComplaintTimeline/>} />
      </Routes>
      </SignedIn>

      <SignedOut>
      <div className="flex justify-center items-center h-screen">
          <div>
            <h2>Please sign in to access the content.</h2>
            <SignInButton mode="modal">
              <button className="bg-brandPrimary text-white px-4 py-2 mt-4 transition-all duration-300 rounded-lg hover:bg-neutralDGray">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  )
}

export default App
