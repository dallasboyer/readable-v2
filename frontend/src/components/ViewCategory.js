import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class ViewCategory extends Component {
  render() {
    return (
      <Container>
        [View {this.props.match.params.category}]
      </Container>
    )
  }
}

export default ViewCategory