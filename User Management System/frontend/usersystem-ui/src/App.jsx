import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import SearchUsers from "./pages/SearchUsers";
import ViewUser from "./pages/ViewUser";
import UpdateUser from "./pages/UpdateUser";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/search-users" element={<SearchUsers />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
      </Route>
    </Routes>
  );
}