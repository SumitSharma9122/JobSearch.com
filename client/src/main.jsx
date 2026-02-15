import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Toaster } from 'sonner' // 1. Import the Toaster

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster closeButton richColors position="top-right" /> {/* 2. Place it here */}
    </Provider>
  </React.StrictMode>,
)