
import './App.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/authContext'
import Routes from './Routes'
function App() {
 

  return (
   <AuthProvider>
    <Navbar/>
    <Routes/>
   </AuthProvider>
  )
}

export default App
