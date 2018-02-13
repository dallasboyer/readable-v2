import React, { Component } from 'react'
import { Switch, Route, /*withRouter*/ } from 'react-router-dom'

import { Container, Header, Icon } from 'semantic-ui-react'

import ViewAll from './components/ViewAll'
import NotFound from './components/NotFound'
import CategoryNav from './components/CategoryNav'

class App extends Component {
  componentDidMount(){
    // TODO fetch all posts
    // TODO fetch all categories
  }
  render() {
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='talk outline' />
          <Header.Content>
            Readable V2
          </Header.Content>
        </Header>

        <CategoryNav
          // TODO categories={}
        />
        
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

        <Container fluid textAlign="center">
          Made by Dallas
        </Container>
      </div>
    )
  }
}

export default App
// export default withRouter(App)
