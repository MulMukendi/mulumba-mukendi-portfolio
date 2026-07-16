
import { useNavigate } from "react-router-dom";



function UserCard({ user, onDelete }) {
      const navigate = useNavigate();
   
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            {user.firstName} {user.lastName}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            @{user.username}
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {user.age} yrs
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Email
          </p>

          <p className="text-slate-700">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            User ID
          </p>

          <p className="text-slate-700">
            #{user.id}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button 
            onClick={() => navigate(`/users/${user.id}`)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          View
        </button>

        <button 
                onClick={() => navigate(`/update-user/${user.id}`)}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Edit
        </button>

        <button
                onClick={() => {
                    console.log("Button clicked");
                    onDelete(user.id);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                Delete
            </button>
      </div>
    </div>
  );
}

export default UserCard;