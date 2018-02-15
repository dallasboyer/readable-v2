import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

import {
  Container,
  Card,
  Icon,
  Label,
} from 'semantic-ui-react'

import * as Helpers from '../utils/Helpers'
import NewPostModal from './NewPostModal'
import SortBy from './SortBy'

class ViewCategory extends Component {
  render() {

    let pagePosts = this.props.posts.filter(post => post.category === this.props.match.params.category)

    let pagePostsSorted = pagePosts
    pagePostsSorted.sort(sortBy(this.props.sortBy))

    let renderPosts = pagePostsSorted.length !== 0
      ?
      (<Card.Group
        centered
        itemsPerRow={1}
      >

        {pagePostsSorted.map((item, index) => (
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

      </Card.Group>)
      :
        (<div>
          NO POSTS
        </div>)



    return (
      <Container>
        <NewPostModal />
        <SortBy />
        
        {renderPosts}

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

export default ViewCategory