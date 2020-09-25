import React, { createContext, useReducer, useEffect } from 'react'
import AppReducer from './AppReducer'
import { firestore } from '../firebase/firebase'
import { AddTodo } from '../components/AddTodo/AddTodo'

const initialState = {
    todos: [],
    user: null
}


export const GlobalContext = createContext(initialState)

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        if (state.user) {

            firestore.collection('users').doc(state.user.uid).collection('todos').get().then(function (querySnapshot) {
                const todo = querySnapshot.docs.map(todo => todo.data().newTodo)

                updateTodo(todo)
            })

        } else if (!state.user) {
            const localTodos = localStorage.getItem('todo')
            updateTodo(JSON.parse(localTodos))

        }

    }, [state.user])

    useEffect(() => {
        if (!state.user) {
            localStorage.setItem('todo', JSON.stringify(state.todos))
        }
    }, [state.todos])

    function updateTodo(todos) {
        dispatch({
            type: 'UPDATE_TODO',
            payload: todos
        })
    }

    function completedHandler(id) {
        dispatch({
            type: 'CHANGE_COMPLETED',
            payload: id
        })
    }

    function addTodo(todo) {
        dispatch({
            type: 'ADD_TODO',
            payload: todo
        })
    }

    function removeTodo(id) {
        dispatch({
            type: 'REMOVE_TODO',
            payload: id
        })
    }

    function addUser(user) {
        dispatch({
            type: 'ADD_USER',
            payload: user
        })
    }

    return (<GlobalContext.Provider value={
        {
            todos: state.todos,
            user: state.user,
            completedHandler,
            addTodo,
            removeTodo,
            addUser,
            updateTodo
        }
    }>
        {props.children}
    </GlobalContext.Provider>)
}
