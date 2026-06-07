import './App.css'
import Navbar from './components/NavBar/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import InteractiveChart from './pages/Calc.jsx'
import InitialInput from './pages/Input.jsx'
import Utilities from './pages/Utilities.jsx'

function App() {
  document.title = "MSSE Capstone Clone"
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/input' element={<InitialInput />} />
        <Route path='/analysis' element={<InteractiveChart />} />
        <Route path='/utils' element={<Utilities />} />
      </Routes>
    </>
  )
}

export default App
