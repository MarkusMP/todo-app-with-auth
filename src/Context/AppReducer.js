export default (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'CHANGE_COMPLETED':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : { ...todo })
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }

        case 'UPDATE_TODO':
            return {
                ...state,
                todos: action.payload
            }
        default: return state
    }
}