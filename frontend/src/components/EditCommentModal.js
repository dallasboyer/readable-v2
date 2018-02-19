import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import {
  editComment,
} from '../actions/comments'

import {
  Button,
  Header,
  Icon,
  Modal,
  Form
} from 'semantic-ui-react'

class EditCommentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      body: props.comment.body,
    }

  }
  static propTypes = {
    editComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  clearForm = () => {
    this.setState({
      body: "",
    });
  }

  handleSubmit = () => {

    const comment = {
      id: this.props.comment.id,
      body: this.state.body,
    }

    console.log("Submitted", comment)

    this.props.editComment(comment)
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
            positive
            circular
          />
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >

        <Header icon='edit' content='Modify this comment:' />

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
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
              <Icon name='checkmark' /> Update Comment
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editComment: comment => dispatch(editComment(comment))
})

export default connect(null, mapDispatchToProps)(EditCommentModal)