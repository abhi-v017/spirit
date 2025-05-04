import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Homepage from './pages/Homepage.jsx'
import Myprofile from './pages/Myprofile.jsx'
import AddPost from './pages/AddPost.jsx'
import Posts from './pages/Posts.jsx'
import Search from './pages/Search.jsx'
import Settings from './pages/Settings.jsx'
import Persuings from './pages/Persuings.jsx'
import Persuers from './pages/Persuers.jsx'
import Userprofile from './pages/Userprofile.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Messages from './pages/Messages.jsx'
import PostDetails from './pages/PostDetails.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import Sample from './ChatBot/Sample.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/my-profile',
        element: <Myprofile />
      },
      {
        path: '/add-post',
        element: <AddPost />
      },
      {
        path:'/messages',
        element: <Messages/>
      },
      {
        path: '/posts',
        element: <Posts />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/profile/:username/persuings',
        element: <Persuings />
      },
      {
        path: '/profile/:username/persuers',
        element: <Persuers />
      },
      {
        path: '/user-profile/:username',
        element: <Userprofile />
      },
      {
        path: '/post-details/:id',
        element: <PostDetails/>
      },
      {
        path: '/update-profile',
        element: <UpdateProfile/>
      },
      {
        path: '/sample',
        element: <Sample/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
