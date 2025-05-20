import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

function MainLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout