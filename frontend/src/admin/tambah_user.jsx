import React from 'react'
import Swal from "sweetalert2"

const TambahUser = () => {
  const token = localStorage.getItem('token')
const handleSubmit = async (event) => {
    event.preventDefault()
    const fData = {}
    const frmel = event.target
    for (let el of frmel.elements) {
      fData[el.name] = el.value
    }
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    })
    if (!response.ok) {
      console.log(error => console.error)
    } else {
      event.target.reset()
      Swal.fire({
        icon: "success",
        text: "Simpan berhasil",
        timer: 1000
      }).then(res => {
        window.location.href = '/admin/user'
      })

    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <a href="/admin/user" className="btn btn-primary float-start">Lihat data</a>
              <h2 className="text-center">Input Data User</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="nama">Nama</label>
                  <input type="text" name="nama" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TambahUser