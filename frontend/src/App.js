import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import {
  Container,
  Header,
  Icon,
  Button,
} from 'semantic-ui-react'

import ViewAll from './components/ViewAll'
import ViewCategory from './components/ViewCategory'
import ViewPost from './components/ViewPost'
import NotFound from './components/NotFound'
import CategoryNav from './components/CategoryNav'

import {
  fetchPosts,
  changeSortOrder,
} from './actions/posts'

import { fetchCategories } from './actions/categories'

class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    changeSortOrder: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
  }

  componentDidMount(){
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  render() {
    return (
      <div
        style={customStyles.app}
      >
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
              sortBy={this.props.sortBy}
            />
          )} />

          <Route exact strict path="/:category" render={props => (
            <ViewCategory
              {...props}
              posts={this.props.posts}
              sortBy={this.props.sortBy}
            />
          )} />

          <Route exact strict path="/:category/:id" render={props => (
            <ViewPost
              {...props}
              posts={this.props.posts}
              comments={this.props.comments}
            />
          )} />

          <Route path="*" render={() => (
            <NotFound />
          )} />

        </Switch>

        <Container
          fluid
          textAlign="center"
          style={customStyles.footer}
        >
          <Button
            href="https://github.com/dallasboyer/readable-v2"
            icon="github"
            content="Made By Dallas"
          />
        </Container>
      </div>
    )
  }
}

const customStyles = {
  app: {
    backgroundColor: "white",
  },
  footer: {
    padding: "50px 0"
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts,
    comments: state.comments.comments,
    sortBy: state.posts.sortBy,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  changeSortOrder: sortBy => dispatch(changeSortOrder(sortBy)),
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)