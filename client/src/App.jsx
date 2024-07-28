import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './views/Login'
import Registration from './views/Registration'
import CreateService from './views/CreateService'
import CreateBooking from './views/CreateBooking'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/register' element={<Registration/>} />
          <Route exact path='/create-service' element={<CreateService/>} />
          <Route exact path='/book/:serviceId' element={<CreateBooking/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
