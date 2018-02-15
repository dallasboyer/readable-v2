import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import {
  Button,
  Confirm,
} from 'semantic-ui-react'

import {
  removePost,
} from '../actions/posts'

class DeletePostModal extends Component {
  state = {
    open: false,
  }

  show = () => this.setState({ open: true })
  
  handleConfirm = () => {

    if(this.props.match.path === "/:category/:id"){
      this.props.removePost(this.props.post)
      this.setState({ open: false })
      this.props.history.goBack()
    } else {
      this.props.removePost(this.props.post)
      this.setState({ open: false })
    }

  }

  handleCancel = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <div>
        <Button
          // content="delete"
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
  removePost: post => dispatch(removePost(post)),
})

export default connect(null, mapDispatchToProps)(DeletePostModal)