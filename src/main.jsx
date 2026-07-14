import { createRoot } from 'react-dom/client'
import "./app/index.css"
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/app.routes'
import ThemeProvider from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <RouterProvider router={routes} />
    </ThemeProvider>
)   