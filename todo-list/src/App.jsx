import React from 'react'
import AppName from './components/AppName'
import AddTodo from './components/AddTodo'
import TodoItems from './components/TodoItems'


const App = () => {
  return (
    <>
    <AppName/>
    <AddTodo />
    <TodoItems/>
    </>
  )
}

export default App