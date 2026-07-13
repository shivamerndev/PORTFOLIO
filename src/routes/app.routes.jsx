import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

export const routes = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            }
        ]
    }
])