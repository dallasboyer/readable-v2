import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  Container,
  Card,
  Icon,
  Label,
} from 'semantic-ui-react'

import * as Helpers from '../utils/Helpers'
import DeletePostModal from './DeletePostModal'
import Voter from './Voter'

class ViewPost extends Component {
  render() {
    // NOTE this.props.match.params.category
    // NOTE this.props.match.params.id

    console.log("POST Props", this.props)
    
    let currentPost = this.props.posts.filter(post => post.id === this.props.match.params.id).pop()

    let renderPost = currentPost
      ?
      (<Card as='article' centered>

        <Card.Content as='section'>

          <Label as={Link} to={`/${currentPost.category}`} color='teal' ribbon='right'>{currentPost.category}</Label>

          <Card.Header as="h3">
            {`${Helpers.capitalize(currentPost.author)} posted: ${currentPost.title}`}
          </Card.Header>

          <Card.Meta>
            <span>
              {Helpers.calculateDate(currentPost.timestamp)}
            </span>

            <span>
              <span style={customStyles.comment}>
                <Icon name='comment' />
              </span>
              {currentPost.commentCount}
            </span>

            <Voter
              type="post" // post/comment
              item={currentPost}
            />

          </Card.Meta>

          <Card.Description>
            {currentPost.body}
          </Card.Description>

          <hr />

          <Card.Meta textAlign="left">
            <DeletePostModal {...this.props} post={currentPost} />
          </Card.Meta>

        </Card.Content>

      </Card>)
      :
        (<div>No Post</div>)

    return (
      <Container>

        {renderPost}
        
      </Container>
    )
  }
}

const customStyles = {
  comment: {
    paddingLeft: 10,
    paddingRight: 5,
  },
}

ViewPost.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default ViewPost