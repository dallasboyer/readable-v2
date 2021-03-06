import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Menu } from 'semantic-ui-react'

class CategoryNav extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state

    return (
      <Menu inverted>

        <Menu.Item
          name="Home"
          active={activeItem === `Home`}
          onClick={this.handleItemClick}
          as={Link}
          to='/'
        />

        {this.props.categories.map((item, index) => (
          <Menu.Item
            key={index}
            name={item.name}
            active={activeItem === `${item.name}`}
            onClick={this.handleItemClick}
            as={Link}
            to={`/${item.path}`}
          />
        ))}

      </Menu>
    )
  }
}

export default CategoryNav