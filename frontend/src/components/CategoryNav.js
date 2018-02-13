import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class CategoryNav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item name="Home" active={activeItem === `Home`} onClick={this.handleItemClick} />
        {this.props.categories.map((item, index) => (
          <Menu.Item key={index} name={item.name} active={activeItem === `${item.name}`} onClick={this.handleItemClick} />
        ))}
      </Menu>
    )
  }
}