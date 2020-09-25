import React from 'react'
import { Header } from '../components/Header/Header'
import { AddTodo } from '../components/AddTodo/AddTodo'
import TodoList from '../components/TodoList/TodoList'

const TodoPage = () => {
    return (
        <>
            <Header />
            <AddTodo />
            <TodoList />
        </>
    )
}

export default TodoPage
