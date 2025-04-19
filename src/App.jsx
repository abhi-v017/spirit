import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Sidebar />
    </div>
  )
}

export default App
