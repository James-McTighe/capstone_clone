import './App.css'
import Navbar from './components/NavBar/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import InteractiveChart from './pages/Calc.jsx'

function App() {
  document.title = "MSSE Capstone Clone"
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/input' element={<InteractiveChart />} />
      </Routes>
    </>
  )
}

export default App
