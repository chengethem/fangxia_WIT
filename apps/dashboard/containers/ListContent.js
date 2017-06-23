import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchContent, saveContent } from '../actions';
import ListContentBox from '../components/ListContentBox';

class ListContent extends Component {
  constructor(props) {
    super(props);
    const { dispatch, list, match } = this.props;
    dispatch(fetchContent(match.params.content));
  }
  componentDidMount() {

  }
  render() {
    const { contentsByType, contentType } = this.props;
    let content = contentsByType && contentType && contentsByType[contentType] || '';
    if (content instanceof Array) {
      content.sort((a, b) => {
        if (a.order && b.order) {
          return a.order - b.order;
        }
        return a.id - b.id;
      });
    }
    return (
      <ListContentBox content={content || {}} contentType={contentType}></ListContentBox>
    );
  }
}

const mapStateToProps = state => {
  const { contentType, contentsByType } = state;
  // console.info('SHOW_LIST_STATE', state);
  return { contentType, contentsByType };
};

export default connect(mapStateToProps)(ListContent);