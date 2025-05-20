import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

function UserProfile({ user, onSave, onLogout }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  
  const [editing, setEditing] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setEditing(false)
  }
  
  const handleEdit = () => {
    setEditing(true)
  }
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
          <FaUser size={40} className="text-gray-600" />
        </div>
        <button className="text-primary">Змінити</button>
      </div>
      
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Ім'я користувача</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1">Пошта користувача</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-full">
              Зберегти зміни
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">{formData.name}</p>
              <button onClick={handleEdit} className="text-primary">⚙️</button>
            </div>
          </div>
          
          <div className="mb-6">
            <p>{formData.email}</p>
          </div>
          
          <div className="flex justify-center">
            <button onClick={onLogout} className="btn btn-primary w-full">
              Вийти з профіля
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile