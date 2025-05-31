const koneksi = require("./db")
const bcrypt = require("bcryptjs")

const selectUsers = (callback) => {
    const q = "SELECT * FROM users"
    koneksi.query(q, callback)
}
const insertUser = (nama,email,password,callback)=> {
    if (password)
    {
        const hashedPassword = bcrypt.hashSync(password,10)

        const q = `INSERT INTO users (nama,email,password) VALUES (?, ?, ?)`
        koneksi.query(q,[nama,email,hashedPassword],callback)

    }
    else{
        console.error("Password tidak boleh kosong")
    }
}
const selectUserById = (id, callback) => {
    const q = "SELECT * FROM users where id=?"
    koneksi.query(q, [id], callback)
}
const updateUser = (id, nama, email, password, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const q = "update users set nama=?, email=?, password=? where id=?"
        koneksi.query(q, [nama, email, hashedPassword, id], callback)
    } else {
        const q = "update users set nama=?, email=? where id=?"
        koneksi.query(q, [nama, email, id], callback)
    }
}
const deleteUser = (id, callback) => {
    const q = "DELETE FROM users where id=?"
    koneksi.query(q, [id], callback)
}
const selectUserByEmail = (email, callback) => {
    const q = "SELECT * FROM users WHERE email=?"
    koneksi.query(q, [email], callback)
}
module.exports = {selectUsers, insertUser, selectUserById, updateUser, deleteUser, selectUserByEmail}