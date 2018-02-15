import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import sortBy from 'sort-by'

import * as Helpers from '../utils/Helpers'

import {
  Container,
  Card,
  Icon,
  Label,
} from 'semantic-ui-react'

import NewPostModal from './NewPostModal'
import SortBy from './SortBy'

class ViewAll extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
  }

  render() {
    let inputPosts = this.props.posts
    inputPosts.sort(sortBy(this.props.sortBy))

    return (
      <Container>

        <NewPostModal />

        <SortBy />

        <Card.Group
          centered
          itemsPerRow={1}
        >

          {inputPosts.map((item, index) => (
            <Card as='article' key={index}>

              <Card.Content as='section'>

                <Label as={Link} to={`/${item.category}`} color='teal' ribbon='right'>{item.category}</Label>

                <Card.Header as={Link} to={`/${item.category}/${item.id}`}>
                  {`${Helpers.capitalize(item.author)} posted: ${item.title}`}
                </Card.Header>

                <Card.Meta>
                  <span>
                    {Helpers.calculateDate(item.timestamp)}
                  </span>

                  <span>
                    <span style={customStyles.comment}>
                      <Icon name='comment' />
                    </span>
                    {item.commentCount}
                  </span>

                  <span style={customStyles.voter}>
                    <Icon name='thumbs down' />
                    <span style={customStyles.score}>{item.voteScore}</span>
                    <Icon name='thumbs up' />
                  </span>
                </Card.Meta>

                <Card.Description>
                  {item.body}
                </Card.Description>

              </Card.Content>

            </Card>
          ))}

        </Card.Group>
      </Container>
    )
  }
}

const customStyles = {
  comment: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  score: {
    padding: '0 10'
  },
  voter: {
    paddingLeft: '5%',
  },
}

export default ViewAll