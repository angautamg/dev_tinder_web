import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './component/App.tsx'

createRoot(document.getElementById('my-app')!).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
)
