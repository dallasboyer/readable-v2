import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Container,
  Card,
  Icon,
  Label,
  Button,
} from 'semantic-ui-react'

import {
  fetchComments,
  resetComments,
} from '../actions/comments'

import * as Helpers from '../utils/Helpers'
import DeletePostModal from './DeletePostModal'
import EditPostModal from './EditPostModal'
import DeleteCommentModal from './DeleteCommentModal'
import EditCommentModal from './EditCommentModal'
import Voter from './Voter'
import AddCommentForm from './AddCommentForm'

class ViewPost extends Component {
  componentDidMount(){
    this.props.fetchComments(this.props.match.params.id)
  }

  componentWillUnmount(){
    this.props.resetComments()
  }
  
  render(){
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
              <span style={customStyles.commentIcon}>
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
            <Button.Group>
              <DeletePostModal {...this.props} post={currentPost} />
              <Button.Or />
              <EditPostModal {...this.props} post={currentPost} />
            </Button.Group>
          </Card.Meta>

        </Card.Content>

      </Card>)
      :
        (<h1 style={{ textAlign: "center", padding: "50px 0 30px 0" }}>No Post</h1>)



    let renderComments = currentPost && this.props.comments.length !== 0
      ?
      (<Card.Group
        centered
        itemsPerRow={1}
      >
          {this.props.comments.map(comment => (
            <Card
              as='article'
              centered
              key={comment.id}
            >

              <Card.Content as='section'>

                <Card.Header as="h3">
                  {`${Helpers.capitalize(comment.author)} says:`}
                </Card.Header>

                <Card.Description>
                  {comment.body}
                </Card.Description>

                <hr />

                <Card.Meta>
                  <span>
                    {Helpers.calculateDate(comment.timestamp)}
                  </span>

                  <Voter
                    type="comment" // post/comment
                    item={comment}
                  />

                </Card.Meta>

                <Card.Meta textAlign="left">
                  <Button.Group>
                    <DeleteCommentModal {...this.props} comment={comment} />
                    <Button.Or />
                    <EditCommentModal {...this.props} comment={comment} />
                  </Button.Group>
                </Card.Meta>

              </Card.Content>

            </Card>
          ))}
        </Card.Group>)
      :
        (<h1 style={{ textAlign: "center", padding: "50px 0 30px 0" }}>No Comments Available</h1>)

  
    
    let renderCommentCounter = currentPost
      ?
        (<h1 style={{ textAlign: "center", padding: "50px 0 30px 0" }}>{`${currentPost.commentCount} Comments`}</h1>)
      :
        (<h1 style={{ textAlign: "center", padding: "50px 0 30px 0" }}>No Comments</h1>)
          
    return (
      <Container>

        {renderPost}
        {renderCommentCounter}
        <AddCommentForm postId={this.props.match.params.id} />
        {renderComments}
        
      </Container>
    )
  }
}

const customStyles = {
  commentIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
}

ViewPost.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  fetchComments: PropTypes.func.isRequired,
  resetComments: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchComments: (id) => dispatch(fetchComments(id)),
  resetComments: () => dispatch(resetComments()),
})

export default connect(null, mapDispatchToProps)(ViewPost)