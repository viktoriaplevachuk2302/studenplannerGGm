import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser } from 'react-icons/fa'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleProfileClick = () => {
    navigate('/profile')
  }
  
  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <nav className="flex items-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link nav-link-active mr-2' : 'nav-link mr-2'
              }
            >
              Основна
            </NavLink>
            
            <NavLink 
              to="/courses" 
              className={({ isActive }) => 
                isActive ? 'nav-link nav-link-active mr-2' : 'nav-link mr-2'
              }
            >
              Курси
            </NavLink>
            
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              Завдання
            </NavLink>
          </nav>
          
          <div className="flex items-center">
            <div className="mr-2">{user?.name || "Ім'я користувача"}</div>
            <button 
              onClick={handleProfileClick}
              className="p-2 rounded-full bg-primary-dark cursor-pointer"
            >
              <FaUser />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header