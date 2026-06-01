import './App.css'
import Navbar from './components/NavBar/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

function App() {
  document.title = "MSSE Capstone Clone"
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
