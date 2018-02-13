import React, { Component } from 'react'
// import './App.css'
import { Switch, Route, /*withRouter*/ } from 'react-router-dom'
import ViewAll from './components/ViewAll'
import NotFound from './components/NotFound'

class App extends Component {
  componentDidMount(){
    // TODO fetch all posts
    // TODO fetch all categories
  }
  render() {
    return (
      <div>
        <header>
          <h1>Readable V2</h1>
        </header>
        
        <Switch>
          <Route exact strict path="/" render={() => (
            <ViewAll
              // TODO posts={}
            />
          )} />
          <Route path="*" render={() => (
            <NotFound />
          )} />
        </Switch>

        <footer>
          Made by Dallas
        </footer>
      </div>
    )
  }
}

export default App
// export default withRouter(App)
