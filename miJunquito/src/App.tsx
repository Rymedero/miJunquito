import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layouts/navbar'
import './App.css'
import Landing from './pages/landing/Landing'

function AppRoutes() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <div className="App relative min-h-screen bg-transparent">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
