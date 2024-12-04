import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import navbar from './components/Navbar/navbar.jsx'
import { UserProvider } from './context/UserProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <navbar />
    </UserProvider>
  </React.StrictMode>,
)
