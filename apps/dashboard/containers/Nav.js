import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { chooseContentType, fetchContent } from '../actions';
import NavBar from '../components/NavBar';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.contentType !== this.props.contentType) {
      const { dispatch, contentType } = nextProps;
      dispatch(fetchContent(contentType));
    }
  }
  handleClick(contentType) {
    this.props.dispatch(chooseContentType(contentType));
  }
  render() {
    return (
      <NavBar handleClick={this.handleClick} items={this.props.items}></NavBar>
    );
  }
}

const mapStateToProps = state => {
  const { contentType, contentsByType } = state;
  return state;
};

export default connect(mapStateToProps)(Nav);