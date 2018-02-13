import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container, Header, Icon } from 'semantic-ui-react'

import ViewAll from './components/ViewAll'
import NotFound from './components/NotFound'
import CategoryNav from './components/CategoryNav'

import { fetchCategories } from './actions/categories'

class App extends Component {
  componentDidMount(){
    // TODO fetch all posts
    this.props.fetchCategories()
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
          categories={this.props.categories}
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

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)