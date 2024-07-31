import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import CasesSolved from './components/Cases'
import Contact from './components/Form'

function App() {

  return (
    <>
      <Navbar/>
      <Home/>
      <CasesSolved/>
      <About/>
      <Contact/>
    </>
  )
}

export default App
