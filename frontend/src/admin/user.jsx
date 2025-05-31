import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const User = () => {
  const [dataUser, setUsers] = useState([])
  const token = localStorage.getItem('token')

  const tampilData = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    tampilData()
  }, [])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin menghapus data?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://127.0.0.1:3000/api/users/' + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(response => response.json())
          .then(res => {
            window.location.reload()
          })
      }
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <a href="/admin/adduser" className="btn btn-primary">Tambah User</a>
          <table className="table table-striped table-bordered mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.length > 0 ? (
                dataUser.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>
                      <a href={`/admin/edituser/${item.id}`} className="btn btn-danger">Edit</a>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Data Kosong</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default User
