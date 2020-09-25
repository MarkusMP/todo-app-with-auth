import React, { useEffect, useContext } from 'react';
import { GlobalContext } from './Context/GlobalState';
import TodoPage from './pages/TodoPage'
import { Switch, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'
import { auth, createUserDocument } from './firebase/firebase'
import './App.css';
import { AddTodo } from './components/AddTodo/AddTodo';

function App() {

  const { addUser } = useContext(GlobalContext)

  useEffect(() => {
    let unSubsribeFormAuth
    unSubsribeFormAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          const user = snapshot.data()
          addUser(user)
        })
      }
      addUser(userAuth)
    })
    return function cleanUp() {
      unSubsribeFormAuth()
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={TodoPage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
