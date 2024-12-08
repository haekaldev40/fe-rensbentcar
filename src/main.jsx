import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>

      <App />
      </NotificationProvider>
    </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
