import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    
       
      <aside className="w-64 bg-slate-900 text-white">
        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">User System</h1>
          <p className="text-sm text-slate-400">Admin Panel</p>
        </div>

        <nav className="mt-6">
          <Link 
            to="/"
            className="block w-full px-6 py-4 text-left hover:bg-slate-800">
            Dashboard
          </Link>

          <Link 
            to="/users"
            className="block w-full px-6 py-4 text-left hover:bg-slate-800">
            Users
          </Link>

          <Link 
            to="/add-user"
            className="block w-full px-6 py-4 text-left hover:bg-slate-800">
            Add User
          </Link>

          <Link 
            to="/search-users"
            className="block w-full px-6 py-4 text-left hover:bg-slate-800">
            Search Users
          </Link>
        </nav>
      </aside>
    
  )
}
