import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { changeSortOrder } from '../actions/posts'

class SortBy extends Component {
  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    changeSortOrder: PropTypes.func.isRequired,
  }
  
  render() {
    return (
      <label style={customStyles.filter}>
        <strong>Filter:</strong>
        <select
          defaultValue={this.props.sortBy}
          onChange={(e) => {
            this.props.changeSortOrder(e.target.value)
          }}
        >
          <option value="by" disabled>By:</option>
          <option value="-timestamp">Newest</option>
          <option value="timestamp">Oldest</option>
          <option value="-voteScore">Popular</option>
          <option value="voteScore">Unpopular</option>
          <option value="category">Category (A-Z)</option>
          <option value="-category">Category (Z-A)</option>
        </select>
      </label>
    );
  }
}

const customStyles = {
  filter: {
    paddingLeft: 20,
  },
}

const mapStateToProps = (state, props) => {
  return {
    sortBy: state.posts.sortBy,
  }
}

const mapDispatchToProps = dispatch => ({
  changeSortOrder: sortBy => dispatch(changeSortOrder(sortBy)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortBy)