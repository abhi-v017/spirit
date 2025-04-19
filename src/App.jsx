import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/6">
        <Navbar />
      </div>
      <main className="w-[calc(100%-41.67%)] overflow-y-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <div className="w-1/4">
        <Sidebar />
      </div>
    </div>
  )
}

export default App
