import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import { firestore } from '../../firebase/firebase'
import uuid from 'uuid'

export const AddTodo = () => {
    const { addTodo, user } = useContext(GlobalContext)

    const [title, setTitle] = useState('')

    function submitHandler(e) {
        if (title !== '') {
            const newTodo = { title: title, completed: false, id: uuid() }
            e.preventDefault()
            addTodo(newTodo)

            if (user) {
                const dbRef = firestore.collection('users').doc(user.uid).collection('todos').doc(newTodo.id)
                dbRef.set({
                    newTodo
                })
            }
            setTitle('')
        } else {
            alert('please enter a todo...')
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus={true} type="text" />
                <button onSubmit={submitHandler} type="submit" className="Add">Add Todo</button>
            </form>
        </div>
    )
}

