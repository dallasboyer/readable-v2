import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {
  Button,
} from 'semantic-ui-react'

import {
  vote,
} from '../actions/posts'

class Voter extends Component {
  render() {
    return (
      <span style={customStyles.voter}>
        <Button
          icon="thumbs up"
          size="mini"
          onClick={() => {
            this.props.vote(this.props.type, this.props.item.id, "upVote")
          }}
        /> 

        <span style={customStyles.score}>{this.props.item.voteScore}</span>

        <Button
          icon="thumbs down"
          size="mini"
          onClick={() => {
            this.props.vote(this.props.type, this.props.item.id, "downVote")
          }}
        />
      </span>
    );
  }
}

Voter.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
}

const customStyles = {
  score: {
    padding: '0 10'
  },
  voter: {
    paddingLeft: '5%',
  },
}

const mapDispatchToProps = dispatch => ({
  vote: (itemType, id, option) => dispatch(vote(itemType, id, option))
})

export default connect(null, mapDispatchToProps)(Voter)