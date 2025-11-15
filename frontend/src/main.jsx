import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style.scss'

import './assets/register.scss'
import './assets/login.scss'


import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { AuthProvider } from './components/context/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
          <App />
    </AuthProvider>

  </StrictMode>,
)
