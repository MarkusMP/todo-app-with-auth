import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import { firestore } from '../../firebase/firebase'

const Todo = ({ todo }) => {
    const { completedHandler, removeTodo, user } = useContext(GlobalContext)

    function removeTodos() {
        removeTodo(todo.id)

        if (user) {
            firestore.collection('users').doc(user.uid).collection('todos').doc(todo.id).delete().then(() => {
                console.log('success')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function completeHandler() {
        completedHandler(todo.id)

        if (user) {
            const todoRef = firestore.collection('users').doc(user.uid).collection('todos').doc(todo.id)

            todoRef.update({ "newTodo.update": todo.completed })
        }
    }

    return (
        <li><span className={todo.completed ? 'completed' : ''} onClick={completeHandler} >{todo.title}</span> <button onClick={removeTodos}>X</button></li>
    )
}

export default Todo
