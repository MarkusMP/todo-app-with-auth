import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/GlobalState'
import Todo from '../Todo/Todo'

const TodoList = () => {
    const { todos } = useContext(GlobalContext)


    return (
        <div>
            {<ul>
                {todos ? todos.map(todo => (
                    <Todo key={todo.id} todo={todo} />
                )) : null}
            </ul>}
        </div>
    )
}

export default TodoList

