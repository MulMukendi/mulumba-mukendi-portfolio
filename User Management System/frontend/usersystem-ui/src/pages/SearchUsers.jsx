import { useState } from "react";
import * as userApi from "../api/userApi";
import UserCard from "../components/UserCard";
import UserNotFound from "../components/UserNotFound";


function SearchUsers() {
  const [firstName, setFirstName] = useState("");
  const [users, setUsers] = useState([]);

    const [usernotfound, setUsernotfound] = useState(false);

function handleSearch(e) {
    e.preventDefault();

    setUsernotfound(false);

    userApi
        .searchUsers(firstName)
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            if (error.response?.data === "User not found.") {
                setUsers([]);
                setUsernotfound(true);
            }
        });
}

  function handleDelete(id) {
    console.log("Deleting user:", id);

    userApi.deleteUser(id).then(() => {
      setUsers((currentUsers) => currentUsers.filter(user => user.id !== id));
    });
  }

  return (
    <>

       {usernotfound && (
            <UserNotFound
                onClose={() => setUsernotfound(false)}
            />
        )}
        
      {/* Header */}
      <header className="bg-white px-10 py-6 shadow">
        <h2 className="text-3xl font-bold text-slate-800">
          Search Users
        </h2>

        <p className="text-slate-500">
          Find users by their first name.
        </p>
      </header>

      <div className="p-10">
        {/* Search Box */}
        <div className="rounded-xl bg-white p-8 shadow">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-4 md:flex-row"
          >
            <input
              type="text"
              placeholder="Enter first name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="mt-10">
          <h3 className="mb-6 text-2xl font-semibold text-slate-800">
            Search Results
          </h3>

          {users.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow">
              <p className="text-slate-500">
                No users found.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchUsers;