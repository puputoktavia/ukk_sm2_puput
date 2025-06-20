import React, { useEffect, useState } from "react"

const Home = () => {
    const [user,setUsers]= useState([])
    const [database]= useState([])
    const [authenticated, setAuthenticated]= useState(false)
    const getToken = () => {
        return localStorage.getItem('token')
    }
    useEffect(() => {
        const token = getToken()

        if (token) {
            setAuthenticated(true)
            fetchData(token)
        } else {
            setAuthenticated(false)
        }
    }, [])
    const fetchData = (token) => {
        Promise.all([
            fetch('http://localhost:3000/api/users', {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                }
            })
            .then (response => response.json())
        ])
        .then(([usersData]) => {
            setUsers(usersData)
        })
        .catch(error => {
            console.error('Error fetching data', error)
        })
    }
    return (
        <div>
            <h2>Ada {user.length} Data Didatabase user</h2>
        </div>
    )
}
export default Home