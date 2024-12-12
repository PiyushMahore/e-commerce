import { Outlet } from 'react-router'
import './App.css'
import NavBar from "./components/NavBar"
import { useEffect } from 'react'
import { useUser } from './context/UserContextProvider'

function App() {
  const useAuth = useUser()
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await useAuth.getCurrentUser()
      console.log(user);
    }

    getCurrentUser()
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
