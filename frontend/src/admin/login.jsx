import React from 'react'
import Swal from 'sweetalert2'

const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const fData = {}
    for (let elm of event.target.elements) {
      if (elm.type === 'email' || elm.type === 'password') {
        fData[elm.name] = elm.value
      }
    }
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          if (response.status === 401) {
            Swal.fire({
              icon: "error",
              title: 'Password salah'
            })
          }
          if (response.status === 404) {
            Swal.fire({
              icon: "warning",
              title: "Username tidak ditemukan"
            })
          }
        }
      })
      .then(data => {
        localStorage.setItem('token', data.token)
        event.target.reset()
        window.location.href = "/admin"
      })
      .catch(error => console.error('Error : ', error))
  }

  return (
    <div>
      <main style={{ maxWidth: 500, padding: 'lrem' }} className="mx-auto mt-3">
        <div className="card">
          <div className="card-header text-center">
            <h3>Login</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="email" name="email" id="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" />
              </div>
            </div>
            <div className="card-footer text-end">
              <button type="submit" className="btn btn-primary">login</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
export default Login