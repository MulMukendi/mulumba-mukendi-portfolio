import {Link} from "react-router-dom";

export default function AddUserButton() {
  return (
        
                <Link 
                    to="/add-user"
                    className="rounded-lg bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
                    >
                    Add User
                </Link>

  )
}
