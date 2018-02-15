import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { newPost } from '../actions/posts'

import {
  Button,
  Header,
  Icon,
  Modal,
  Form
} from 'semantic-ui-react'

import * as Helpers from '../utils/helpers'

class NewPostModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    newPost: PropTypes.func.isRequired,
  }

  state = {
    modalOpen: false,
    title: "",
    author: "",
    body: "",
    category: "",
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  clearForm = () => {
    this.setState({
      title: "",
      author: "",
      body: "",
      category: "",
    });
  }
  
  handleSubmit = () => {

    const post = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }

    console.log("Submitted", post)

    this.props.newPost(post)
    this.clearForm()
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
        trigger={<Button onClick={this.handleOpen}>Add A Post</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >
        <Header icon='comment' content='What would you like to say:' />

        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
             <Form.Field>
               <input
                 name="title"
                 placeholder='Title'
                 type="text"
                 onChange={this.handleInputChange}
                 required
               />
             </Form.Field>
             <Form.Field>
               <input
                 name="author"
                 placeholder='Author'
                 type="text"
                 onChange={this.handleInputChange}
                 required
               />
             </Form.Field>
             <Form.Field>
               <textarea
                 name="body"
                 placeholder='Your message'
                 type="text"
                 onChange={this.handleInputChange}
                 required
               />
             </Form.Field>
             <Form.Field>
               <select
                 name="category"
                 onChange={this.handleInputChange}
                 required
               >
                 <option value="">Select a category</option>
                 {this.props.categories.map((category, index) => (
                   <option value={category.name} key={index}>{Helpers.capitalize(category.name)}</option>
                 ))}
               </select>
             </Form.Field>
            <Form.Button>
              <Icon name='checkmark' /> Add Post
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
  newPost: post => dispatch(newPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal)