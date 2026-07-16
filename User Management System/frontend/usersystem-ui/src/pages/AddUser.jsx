import { useState } from "react";
import * as userApi from "../api/userApi";
import {useNavigate} from "react-router-dom";
import EmailExists from "../components/EmailExists";
import UserNameTaken from "../components/UserNameTaken";

function AddUser() {

  const  navigateTo = useNavigate();

  const [exceptions, setExceptions] = useState({
    usernotfound: false,
    emailalreadyexists: false,
    usernamealreadyexists: false,
  });

  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    age: "",
  });

  function handleChange(e) {                //generic handleChange to hsndle all input changes
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newExceptions = {
      usernotfound: false,
      emailalreadyexists: false,
      usernamealreadyexists: false,
    };

    console.log(user);

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

    userApi.createUser(normalizedUser).then( (response) => {

        navigateTo(`/users/${response.data.id}`);  
         /*redirect to users page after user creation, response.data.id is the id of the newly created user returned from the backend
        not the user you just created, that one has no id yet, the backend generates the id and returns it in the response*/
    }).catch((error) => {
      
      if(error.response.data === "This email already exists in our system."){
            newExceptions.emailalreadyexists = true;
      } else if(error.response.data === "This username has been taken. try another."){
            newExceptions.usernamealreadyexists = true;
      } 

      setExceptions(newExceptions);
      return Object.values(newExceptions).every(error => error === false);
    
    });
        
    
    
  }

  function handleReset() {
    setUser({
      username: "",
      firstName: "",
      lastName: "",
      age: "",
      email: "",
    });

    setErrors({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      age: "",
    });
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

      // First Name
      if (!/^[A-Za-z]+$/.test(firstName.trim())) {
        newErrors.firstName = "First name must contain only letters";
      } else if (firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters long";
      }

      // Last Name
      if (!/^[A-Za-z]+$/.test(lastName.trim())) {
        newErrors.lastName = "Last name must contain only letters";
      } else if (lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters long";
      }

      // Email
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }

      // Username
      if (username.trim().length < 3) {
        newErrors.username = "Username must be at least 3 characters long";
      }

      // Age
      if (age < 13 || age > 120) {
        newErrors.age = "Age must be between 13 and 120";
      }

      setErrors(newErrors);

      return Object.values(newErrors).every(error => error === "");
}

  return (
    <div className="flex min-h-screen bg-slate-100">

     

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
              Add User
            </h2>

            <p className="text-slate-500">
              Create a new user for the system
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
                    Username <span className="text-red-500 font-bold">*</span>
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
                    Email <span className="text-red-500 font-bold">*</span>
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
                    First Name <span className="text-red-500 font-bold">*</span>
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
                    Last Name <span className="text-red-500 font-bold">*</span>
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
                    Age <span className="text-red-500 font-bold">*</span>
                  </label>

                  <input
                    type="number"
                    name="age"
                    min="13"
                    max="120"
                    value={user.age}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter age"
                  />
                </div>

              </div>

              <div className="border-t pt-8">

                <p className="mb-6 text-sm">
                  <span className="font-bold text-red-500">*</span> Required fields
                </p>

                <div className="flex gap-4">

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Create User
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

export default AddUser;