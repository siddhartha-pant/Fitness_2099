import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import SignupPage from './components/SignUp.jsx'
import LoginPage from './components/LoginPage.jsx'
import FinalDisplayer from './components/FinalDisplayer.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/signup',
        element:<SignupPage/>
      },
      {
        path:'/signIn',
        element:<LoginPage/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
       <Provider store={store}>
    <RouterProvider router={router} />
       </Provider>
    </ThemeProvider>
  </StrictMode>,
)
