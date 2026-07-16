import { useState, useEffect } from "react";
import * as userApi from "../api/userApi";
import {useNavigate, useParams} from "react-router-dom";
import UserNotFound from "../components/UserNotFound";
import EmailExists from "../components/EmailExists";
import UserNameTaken from "../components/UserNameTaken";

export default function UpdateUser() {
  const { id } = useParams();
  const  navigateTo = useNavigate();
  const [user, setUser] = useState(null);


  const [exceptions, setExceptions] = useState({
    usernotfound: false,
    emailalreadyexists: false,
    usernamealreadyexists: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });




    useEffect(() => {

      const userNotFound = false;

            userApi.getUser(id)
                .then((response) => {
                setUser(response.data);
                })
                .catch((error) => {
                      if (error.response.data === "User not found") {
                        userNotFound = true;
                        
                      }
                });

                setExceptions((prevExceptions) => ({
                  ...prevExceptions,
                  usernotfound: userNotFound
                }));
    }, [id]);


  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
        ...user,
        [name]: name === "age" ? Number(value) : value,             // Convert age to number if the field is age
    });
    }

  function handleSubmit(e) {
    e.preventDefault();

    const newExceptions = {
      usernotfound: false,
      emailalreadyexists: false,
      usernamealreadyexists: false,
    };


    if (!validateForm()) {
      return;
    }

    const normalizedUser = {
        ...user,
        username: user.username.trim().toLowerCase(),
        email: user.email.trim().toLowerCase(),
        firstName: user.firstName.trim(),
        lastName: user.lastName.trim(),
    };    

    userApi.updateUser(id, normalizedUser)
        .then(() => {
        navigateTo(`/users/${id}`);  //redirect to user profile page after user update
        }).catch((error) => {
      
      if(error.response.data === "This email already exists in our system."){
            newExceptions.emailalreadyexists = true;
      } else if(error.response.data === "This username has been taken. try another."){
            newExceptions.usernamealreadyexists = true;
      } 
      
      setExceptions(newExceptions);
    })
}
      

    function handleReset() {
        setErrors({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          age: "",
        });

        userApi.getUser(id).then((response) => {
            setUser(response.data);
        });
    }

    if (!user) {
        return <h2 className="p-10">Loading...</h2>;
    }

    function validateForm() {
          const { username, firstName, lastName, age, email } = user;

          const newErrors = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            age: "",
          };

            // Username
            if (!/^[A-Za-z0-9._]+$/.test(username.trim())) {
                newErrors.username =
                  "Username can only contain letters, numbers, periods and underscores.";
              } else if (username.length < 3) {
                newErrors.username =
                  "Username must be at least 3 characters long.";
              } else if (username.length > 30) {
                newErrors.username =
                  "Username cannot be longer than 30 characters.";
              }

          if (!/^[A-Za-z]+$/.test(firstName.trim())) {
            newErrors.firstName = "First name must contain only letters";
          } else if (firstName.trim().length < 2) {
            newErrors.firstName =
              "First name must be at least 2 characters long";
          }

          if (!/^[A-Za-z]+$/.test(lastName.trim())) {
            newErrors.lastName = "Last name must contain only letters";
          } else if (lastName.trim().length < 2) {
            newErrors.lastName =
              "Last name must be at least 2 characters long";
          }

          if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
              email.trim()
            )
          ) {
            newErrors.email = "Please enter a valid email address";
          }

          if (username.trim().length < 3) {
            newErrors.username =
              "Username must be at least 3 characters long";
          }

          if (age < 13 || age > 120) {
            newErrors.age =
              "Age must be between 13 and 120";
          }

          setErrors(newErrors);

          return Object.values(newErrors).every( error => error === "" );
     }

  return (
    <div className="flex min-h-screen bg-slate-100">

        {exceptions.usernotfound && (
            <UserNotFound 
                onClose={() => setExceptions({ ...exceptions, usernotfound: false })}
            />
        )}

       {exceptions.emailalreadyexists && (
            <EmailExists 
                onClose={() => setExceptions({ ...exceptions, emailalreadyexists: false })}
            />)
      }

      {exceptions.usernamealreadyexists && (
            <UserNameTaken 
                onClose={() => setExceptions({ ...exceptions, usernamealreadyexists: false })}
            />)
      }
        

      {/* Main */}
      <main className="flex-1">

        {/* Header */}
        <header className="flex items-center justify-between bg-white px-10 py-6 shadow">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
                Update User
            </h2>

            <p className="text-slate-500">
                 Edit user information
            </p>

          </div>

        </header>

        {/* Form */}
        <div className="p-10">

          <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 shadow">

            <h3 className="mb-8 text-2xl font-semibold">
              User Information
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-medium">
                    Username <spam className="text-red-500 font-bold">*</spam>
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter username"
                  />
                  {errors.username && <p className="text-red-500">{errors.username}</p>}
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Email <spam className="text-red-500 font-bold">*</spam>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter email"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}  
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    First Name <spam className="text-red-500 font-bold">*</spam>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Last Name <spam className="text-red-500 font-bold">*</spam>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    min="0"
                    max="120"
                    value={user.age}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter age"
                  />
                  {errors.age && <p className="text-red-500">{errors.age}</p>}
                </div>

              </div>

              <div className="border-t pt-8">

                <p className="mb-6 text-sm text-red-500">
                  <spam className="text-red-500 font-bold">*</spam> Required fields
                </p>

                <div className="flex gap-4">

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Update User
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
                  >
                    Reset
                  </button>

                </div>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}
