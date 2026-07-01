import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import Home from "../Pages/Home";


export const routes = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])