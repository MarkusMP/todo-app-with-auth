import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

export const Header = () => {
    const { user, updateTodo } = useContext(GlobalContext)


    function signout() {
        auth.signOut()
        const todo = localStorage.getItem('todo')
        updateTodo(JSON.parse(todo))
    }
    return (
        <div className="header">
            <h1>Todo App</h1>
            <div className="links">
                {user ? <button className="log" onClick={signout}>Log Out</button> : <Link to="/login">Login</Link>}
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
