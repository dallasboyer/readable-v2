import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { Container, Header, Icon } from 'semantic-ui-react'

import ViewAll from './components/ViewAll'
import ViewCategory from './components/ViewCategory'
import NotFound from './components/NotFound'
import CategoryNav from './components/CategoryNav'

import { fetchPosts } from './actions/posts'
import { fetchCategories } from './actions/categories'

class App extends Component {
  componentDidMount(){
    this.props.fetchPosts()
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

          <Route exact strict path="/" render={props => (
            <ViewAll
              {...props}            
              posts={this.props.posts}
            />
          )} />

          <Route exact strict path="/:category" render={props => (
            <ViewCategory
              {...props}
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
    posts: state.posts.posts,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)