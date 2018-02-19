import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {
  Form,
  Icon,
} from 'semantic-ui-react'


import { newComment } from '../actions/comments'

class AddCommentForm extends Component {
  state = {
    author: "",
    body: "",
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <input
            name="author"
            placeholder='Author'
            type="text"
            value={this.state.author}
            onChange={this.handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <textarea
            name="body"
            placeholder='Your message'
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
            required
          />
        </Form.Field>
        <Form.Button>
          <Icon name='comment' /> Add Comment
        </Form.Button>
      </Form>
    );
  }

  handleSubmit = event => {
    event.preventDefault()

    const comment = {
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.postId,
    }

    console.log("Submitted", comment)

    this.props.newComment(comment)
    this.clearForm()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  clearForm = () => {
    this.setState({
      author: "",
      body: "",
    })
  }

}

AddCommentForm.propTypes = {
  newComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  newComment: comment => dispatch(newComment(comment))
})

export default connect(null, mapDispatchToProps)(AddCommentForm)