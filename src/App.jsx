import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/5">
        <Navbar />
      </div>
      <main className="w-[calc(100%-45%)] overflow-y-auto">
        <div>
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
