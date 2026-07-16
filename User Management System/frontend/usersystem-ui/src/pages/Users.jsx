import { useEffect, useState } from "react";
import * as userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";


function Users() {
  const [users, setUsers] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    userApi
      .getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleDelete(id) {
    userApi.deleteUser(id).then(() => {
      setUsers(currentUsers =>
        currentUsers.filter(user => user.id !== id)
      );
    });
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white px-10 py-6 shadow">
        <h2 className="text-3xl font-bold text-slate-800">
          Users
        </h2>

        <p className="text-slate-500">
          View all registered users.
        </p>
      </header>

      <div className="p-10">
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Age</th>
                <th className="px-6 py-4 text-left">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    #{user.id}
                  </td>

                  <td className="px-6 py-4">
                    @{user.username}
                  </td>

                  <td className="px-6 py-4">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    {user.age}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                            onClick={() => navigate(`/users/${user.id}`)}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                            View
                    </button>

                    <button 
                      onClick={() => navigate(`/update-user/${user.id}`)}
                      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                      Edit
                    </button>

                    <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Users;