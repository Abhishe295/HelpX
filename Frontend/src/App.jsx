import { useState } from 'react'


import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThemePage from './pages/ThemePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/theme' element={<ThemePage/>}/>
      </Routes>
    </div>
  )
}

export default App
