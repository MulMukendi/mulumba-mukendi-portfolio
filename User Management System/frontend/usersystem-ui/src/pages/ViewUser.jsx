import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as userApi from "../api/userApi";

function ViewUser() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    userApi
      .getUser(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!user) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white px-10 py-6 shadow">
        <h2 className="text-3xl font-bold text-slate-800">
          User Profile
        </h2>

        <p className="text-slate-500">
          Detailed information about this user.
        </p>
      </header>

      <div className="p-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 shadow">

          <div className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold text-slate-800">
              {user.firstName} {user.lastName}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              @{user.username}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <p className="text-sm uppercase text-slate-400">
                User ID
              </p>

              <p className="mt-1 text-lg font-medium">
                #{user.id}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase text-slate-400">
                Email
              </p>

              <p className="mt-1 text-lg font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase text-slate-400">
                Age
              </p>

              <p className="mt-1 text-lg font-medium">
                {user.age}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase text-slate-400">
                Created
              </p>

              <p className="mt-1 text-lg font-medium">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase text-slate-400">
                Last Updated
              </p>

              <p className="mt-1 text-lg font-medium">
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;