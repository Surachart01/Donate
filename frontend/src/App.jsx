import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Form from './pages/Form'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Big screen */}
        <Route path='/' element={<Screen />} />
        {/* Admin Page   */}
        <Route path='/admin' element={<Admin />} />
        {/* From Order */}
        <Route path='/order' element={<Form />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
