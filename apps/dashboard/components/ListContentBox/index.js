import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import styles from './style.css';
import { cyan500, green500 } from 'material-ui/styles/colors';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Link } from 'react-router-dom';

class ContentBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { content, contentType } = this.props;
    let substance;

    console.info('RENDER_LISTCONTENT', content);
    const items = content instanceof Array ? content.map((item, index) => {
      const id = item.id >= 0 ? item.id : index;
      return (
        <ListItem id={id} key={id} containerElement={Link} to={`/dashboard/edit/${contentType}?index=${id}`}>
          {item.name}
          <span className={styles['right-arrow']}>»</span>
        </ListItem>
      );
    }) : [];
    substance = (
      <List>
        <ListItem containerElement={Link} to={`/dashboard/edit/${contentType}?add=1`}>
          <span className={styles.new}>+ 添加新项目</span>
        </ListItem>
        {items}
      </List>
    );

    return (
      <div className={styles.box}>
        {substance}
      </div>
    );
  }
}

export default ContentBox;
