const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const index = (req, res) => {
    User.selectUsers((err,result)=>{
        if (err)
        {
            return res.status(500).json({error:err.message})
        }
        if (result.length===0) {
            return res.status(404).json({message:"user kosong"})
        }
        res.status(200).json(result)
    })
}


const storeUser = (req, res) => {
    const {nama, email, password} = req.body
    User.insertUser(nama, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res
        .status(201)
        .json ({ message: "Berhasil disimpan", userId: result.insertId })
    })
}
const showUser = (req, res) => {
    const {id} = req.params
    User.selectUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "user ndak ada" })
        }
        res.status(200).json(result[0])
    })
}
const updateUser = (req, res) => {
    const {id} = req.params
    const {nama, email, password} = req.body
    User.updateUser(id,nama,email,password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json("data berhasil dirubah")
    })
}
const destroyUser = (req, res) => {
    const {id} = req.params
    User.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json("data berhasil dihapus")
    })
}
const login = (req, res) => {
    const { email, password } = req.body
    User.selectUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "user ndak ada" })
        }
        const user = result[0]
        const passwordisvalid = bcrypt.compareSync(password, user.password)
        if (!passwordisvalid) {
            return res.status(401).json({ message: "password salah" })
        }
        const token = jwt.sign({ id: user.id }, "ayoosekolah", {
            expiresIn: 86400,
        })
        res.status(200).json({ auth: true, token })
    })
}
const logout = (req, res) => {
    res.status(200).json({ auth: false, token: null })
}
module.exports = {index, storeUser, showUser, updateUser, destroyUser, login, logout}