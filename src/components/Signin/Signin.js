import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)
            history.push('/')
        } catch (error) {
            console.log(error)
            alert('email or password is wrong!')
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitHandler} className="signForm">
                <input autocomplete="on" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email" />
                <input autocomplete="on" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="password" />
                <button type="submit" onSubmit={submitHandler} className="Add">Sign In</button>
            </form>
            <Link to="/" >Go Back</Link>
        </div>
    )
}

export default Signin
