import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Confirm,
} from 'semantic-ui-react'

import {
  removeComment,
} from '../actions/comments'

class DeleteCommentModal extends Component {
  state = {
    open: false,
  }

  show = () => this.setState({ open: true })

  handleConfirm = () => {

    this.props.removeComment(this.props.comment.id)
    this.setState({ open: false })

  }

  handleCancel = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <div>
        <Button
          circular
          icon="trash"
          negative
          size="mini"
          onClick={this.show}
        />
        <Confirm
          open={open}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeComment: id => dispatch(removeComment(id)),
})

export default connect(null, mapDispatchToProps)(DeleteCommentModal)