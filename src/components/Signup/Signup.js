import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createUserDocument, auth } from '../../firebase/firebase'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== rePassword) {
            alert('password and re-type password does not match')
        } else if (password === rePassword) {
            try {
                const { user } = await auth.createUserWithEmailAndPassword(email, password)
                createUserDocument(user)
                history.push('/login')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler} className="signForm">
                <input autocomplete="off" type="email" required placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input autocomplete="off" type="password" required placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input autocomplete="off" type="password" required placeholder="re-type password" value={rePassword} onChange={e => setRePassword(e.target.value)} />
                <button type="submit" onSubmit={submitHandler} className="Add">Sign Up</button>
            </form>
            <Link to="/" >Go Back</Link>
        </div>
    )
}

export default Signup
