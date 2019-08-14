import React from 'react'
import './App.css'
import List from './List'
import Home from './Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function App () {
  return (
    <div id='wrap'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list' component={List} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  )
}

export default App
