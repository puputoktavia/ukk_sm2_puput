import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./admin/login"
import Index from "./admin/index"
import Home from "./admin/home"
import User from "./admin/user"
import TambahUser from "./admin/tambah_user"
import EditUser from "./admin/edit_user"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Index />}>
          <Route path="home" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="adduser" element={<TambahUser />} />
          <Route path="edituser/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
