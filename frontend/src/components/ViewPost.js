import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Container,
  Card,
  Icon,
  Label,
} from 'semantic-ui-react'

import {
  fetchComments,
  resetComments,
} from '../actions/comments'

import * as Helpers from '../utils/Helpers'
import DeletePostModal from './DeletePostModal'
import DeleteCommentModal from './DeleteCommentModal'
import Voter from './Voter'

class ViewPost extends Component {
  componentDidMount(){
    this.props.fetchComments(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.posts !== this.props.posts)

  //     if (nextProps.match.params.category !== this.props.match.params.category) {
  //       this.props.fetchCategoryPosts(nextProps.match.params.category)
  //     }
  // }

  render() {
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
            <DeletePostModal {...this.props} post={currentPost} />
          </Card.Meta>

        </Card.Content>

      </Card>)
      :
        (<div>No Post</div>)



    let renderComments = this.props.comments.length !== 0
      ?
        (<Card.Group centered>
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

                <Card.Meta>
                  <span>
                    {Helpers.calculateDate(comment.timestamp)}
                  </span>

                  <Voter
                    type="comment" // post/comment
                    item={comment}
                  />

                </Card.Meta>

                <Card.Description>
                  {comment.body}
                </Card.Description>

                <hr />

                <Card.Meta textAlign="left">
                  <DeleteCommentModal {...this.props} comment={comment} />
                </Card.Meta>

              </Card.Content>

            </Card>
          ))}
        </Card.Group >)
      :
        (<h3 style={{ textAlign: "center" }}>No Comments Available</h3>)

  
    
    let renderCommentCounter = currentPost
      ?
        (<h1 style={{ textAlign: "center" }}>{`${currentPost.commentCount} Comments`}</h1>)
      :
        (<h1 style={{ textAlign: "center" }}>No Comments</h1>)


    return (
      <Container>

        {renderPost}
        {renderCommentCounter}
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
}

const mapDispatchToProps = dispatch => ({
  fetchComments: (id) => dispatch(fetchComments(id)),
  resetComments: () => dispatch(resetComments()),
})

export default connect(null, mapDispatchToProps)(ViewPost)