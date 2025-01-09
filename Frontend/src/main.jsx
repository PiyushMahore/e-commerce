import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContextProvider.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/Home.jsx';
import Cart from './components/Cart.jsx';
import Orders from './components/Orders.jsx';
import { CartContextProvider } from './context/CartContextProvider.jsx';
import Login from './pages/Login.jsx';
import SignUp from "./pages/SignUp.jsx";
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import PaymentFailed from './pages/PaymentFailed.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      }
    ]
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/orders",
    element: <Orders />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/success",
    element: <PaymentSuccess />
  },
  {
    path: "/cancel",
    element: <PaymentFailed />
  }
])

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </UserContextProvider>,
)
