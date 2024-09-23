import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { Toaster } from 'sonner'
import { store } from './utils/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
      <Toaster position="top-center" closeButton />
    </Provider>
  </>
)
