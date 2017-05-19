import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchContent, saveContent } from '../actions';
import ContentBox from '../components/ContentBox';

class Content extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    const { dispatch, list, match } = this.props;
    dispatch(fetchContent(match.params.content));
  }
  componentDidMount() {

  }
  save(params, id) {
    const { dispatch, contentType } = this.props;
    dispatch(saveContent(contentType, params, id));
  }
  render() {
    const { contentsByType, contentType, location } = this.props;
    const searches = location.search.split('?')[1] && this.props.location.search.split('?')[1].split('&') || [];
    const query = {};
    searches.map((item) => {
      const item_kv = item.split('=');
      query[item_kv[0]] = item_kv[1];
    });
    let content = contentsByType && contentType && contentsByType[contentType] || '';
    content = query.index >= 0 ? content[query.index] : content;
    return (
      <ContentBox content={content || {}} save={this.save} index={query.index}></ContentBox>
    );
  }
}

const mapStateToProps = state => {
  const { contentType, contentsByType, fetched } = state;
  return state;
};

export default connect(mapStateToProps)(Content);