import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './style.css';
import { cyan500, green500 } from 'material-ui/styles/colors';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Link } from 'react-router-dom';

class ContentBox extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.props.content[name] = value;
  }
  render() {
    const { content, save, index } = this.props;
    const handleInputChange = this.handleInputChange;
    const snackBarStyle = {
      background: "green",
      minWidth: "none"
    }
    const buttonStates = {
      loading: { caption: '加载中…' },
      fetched: {
        caption: '保存成功',
        style: {
          background: green500
        }
      },
      normal: {
        caption: '保存',
        style: {
          background: cyan500
        }
      }
    };
    let substance;
    const buttonState = content.loading ? 'loading' : content.fetched ? 'fetched' : 'normal';

    if (content instanceof Array && !(index >= 0)) {
      const items = content.map((item, index) => {
        return (
          <ListItem key={index} containerElement={Link} to={`?index=${index}`}>
            {item.title}
            <span className={styles['right-arrow']}>»</span>
          </ListItem>
        );
      });
      substance = (
        <List>
          {items}
        </List>
      );

    } else {
      const rows = Object.keys(content).map(key => {
        let caption = content._caption && content._caption[key] || key;
        switch (typeof content[key]) {
          case 'string':
            return (
              <div className={styles.row}>
                <label className={styles.caption} htmlFor={`id_${key}`}>{caption}</label>
                <input name={key} className={styles.blank} id={`id_${key}`} type="text" value={content[key]} onChange={handleInputChange} />
              </div>
            );
          case 'object':
            return (
              <div className={styles.row}>
                <label className={styles.caption1} htmlFor={`id_${key}`}>{caption}</label>
                <textarea className={styles.blank1} name={key} id={`id_${key}`} value={JSON.stringify(content[key])} onChange={handleInputChange}></textarea>
              </div>
            );
          default:
            console.info('iterate_array', content[key]);
            return;
        }
      });
      substance = (
        <div>
          {rows}
          <div className={styles['submit-row']} >
            <RaisedButton onClick={() => save(this.state, index)} label={buttonStates[buttonState].caption} buttonStyle={buttonStates[buttonState].style} primary={true} disabled={content.loading} />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.box}>
        {substance}
      </div>
    );
  }
}

export default ContentBox;
