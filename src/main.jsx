import { createRoot } from 'react-dom/client'
import App from './app/App'
import "./app/index.css"
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/app.routes'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes} />
)