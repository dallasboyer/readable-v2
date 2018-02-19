import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {
  editPost,
} from '../actions/posts'

import {
  Button,
  Header,
  Icon,
  Modal,
  Form
} from 'semantic-ui-react'

import * as Helpers from '../utils/Helpers'

class EditPostModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
      title: props.post.title,
      body: props.post.body,
    }

  }
  static propTypes = {
    categories: PropTypes.array.isRequired,
    editPost: PropTypes.func.isRequired,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  clearForm = () => {
    this.setState({
      title: "",
      body: "",
    });
  }

  handleSubmit = () => {

    const post = {
      id: this.props.post.id,
      body: this.state.body,
      title: this.state.title,
    }

    console.log("Submitted", post)

    this.props.editPost(post)
    this.handleClose()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Modal
        trigger={
          <Button
            onClick={this.handleOpen}
            icon="edit"
            circular
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >

        <Header icon='edit' content='Modify this post:' />

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                name="title"
                placeholder='Title'
                type="text"
                onChange={this.handleInputChange}
                value={this.state.title}
                required
              />
            </Form.Field>
            <Form.Field>
              <textarea
                name="body"
                placeholder='Your message'
                type="text"
                onChange={this.handleInputChange}
                value={this.state.body}
                required
              />
            </Form.Field>
            <Form.Button>
              <Icon name='checkmark' /> Update Post
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories.categories,
  }
}

const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostModal)