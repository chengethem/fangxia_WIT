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
  save(params, id, remove, add) {
    const { dispatch, contentType } = this.props;
    dispatch(saveContent(contentType, params, id, remove, add));
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
    let newContent;
    let sum = content.length || 0;
    let index;
    let add = query.add;
    let order;
    // console.info('debug_render_contentsByType[contentType]', contentsByType[contentType]);
    const loading = content.loading;
    const buttonState = content.loading ? 'loading' : content.fetched ? 'fetched' : 'normal';
    if (query.index >= 0) {
      let selectedItem = content instanceof Array && content.filter((item) => +item.id === +query.index)[0];
      if (selectedItem) {
        content = selectedItem;
      } else if (content[query.index]) {
        content = content[query.index];
      }
      index = query.index;
      order = content.order || (+index + 1);
    }
    if (add > 0 && sum > 0 && content[sum - 1]) {
      index = +content[sum - 1].id + 1;
      newContent = {};
      Object.keys(content[sum - 1]).map((key) => {
        if (key === 'id') {
          return;
        }
        newContent[key] = content[sum - 1][key] instanceof Array ? [] : '';
      });
      order = content.order || (+sum + 1);
    }
    return (
      <ContentBox content={newContent || content || {}} contentType={contentType} save={this.save} loading={loading} buttonState={buttonState} sum={sum} order={order} index={index} add={add}></ContentBox>
    );
  }
}

const mapStateToProps = state => {
  const { contentType, contentsByType, requestStatus } = state;
  return state;
};

export default connect(mapStateToProps)(Content);