import { useState, useEffect } from "react";
import * as userApi from "../api/userApi";
import { Link } from "react-router-dom";
import AddUserButton from "../components/addUserButton.jsx";
import { useNavigate } from "react-router-dom";
import updateUser from "./updateUser.jsx";



function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [newTodayCount, setNewTodayCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    userApi.getUserCount().then((response) => {
      setTotalUsers(response.data);
    }).catch((error) => {
      console.error(error);
    });
    
    

  }, []);

  useEffect(() => {

        userApi.get3mostRecentUsers().then((response) => {
            setRecentUsers(response.data);
        }).catch((error) => {
            console.error(error);
        });

  }, [recentUsers]);

    useEffect(() => {
 
        userApi.getAverageAge().then((response) => {
            setAverageAge(response.data);
        }).catch((error) => {
            console.error(error);
        });

  }, [recentUsers]);

      useEffect(() => {
 
        userApi.getNewTodayCount().then((response) => {
            setNewTodayCount(response.data);
        }).catch((error) => {
            console.error(error);
        });

  }, [newTodayCount]);



  return (
    <div className="flex min-h-screen bg-slate-100">
      

      {/* Main */}
      <main className="flex-1">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white px-10 py-6 shadow">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h2>

            <p className="text-slate-500">
              Welcome to the User Management System
            </p>
          </div>

          {/*<AddUserButton />*/}
          
        </header>

        <div className="p-10">
          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Total Users
              </p>

              <h3 className="mt-5 text-5xl font-bold text-blue-600">
                {totalUsers}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                New Today
              </p>

              <h3 className="mt-5 text-5xl font-bold text-green-600">
                {newTodayCount}
              </h3>
            </div>

            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Average Age
              </p>

              <h3 className="mt-5 text-5xl font-bold text-purple-600">
              {averageAge} yrs
              </h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 rounded-xl bg-white p-8 shadow">
            <h3 className="mb-6 text-2xl font-semibold">
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-5">
              <Link
                  to="/users"
                  className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
                View Users
              </Link>

              <AddUserButton />

              <Link
                  to="/search-users"
                  className="inline-block rounded-lg bg-purple-600 px-8 py-4 font-semibold text-white hover:bg-purple-700"
                >
                  Search Users
             </Link>
            </div>
          </div>

          {/* Recent Users */}
          <div className="mt-10 rounded-xl bg-white shadow">
            <div className="border-b px-8 py-5">
              <h3 className="text-2xl font-semibold">
                Recently Added Users
              </h3>
            </div>

            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-8 py-4 text-left">Name</th>
                  <th className="px-8 py-4 text-left">Email</th>
                  <th className="px-8 py-4 text-left">Age</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t"
                  >
                    <td className="px-8 py-5">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-8 py-5">
                      {user.email}
                    </td>

                    <td className="px-8 py-5">
                      {user.age}
                    </td>

                    <td className="px-8 py-5 text-right">
                      <button 
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;