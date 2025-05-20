import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(formData)
  }
  
  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <FaUser size={24} className="text-gray-600" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-center mb-6">Вхід</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm text-gray-600">Введіть вашу пошту</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e-mail"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm text-gray-600">Введіть ваш пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="пароль"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <button type="submit" className="w-full btn btn-primary">
            Увійти
          </button>
        </div>
      </form>
      
      <div className="text-center text-sm">
        <p>Увійдіть, якщо вже маєте акаунт</p>
      </div>
    </div>
  )
}

export default LoginForm