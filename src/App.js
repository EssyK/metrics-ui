import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ConfigureMetrics from './pages/ConfigureMetrics'
import Navbar from './component/Navbar'

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/configure-metrics' element={<ConfigureMetrics/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
