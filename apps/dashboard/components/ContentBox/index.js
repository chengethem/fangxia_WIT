import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import styles from './style.css';
import { cyan500, green500 } from 'material-ui/styles/colors';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Link } from 'react-router-dom';

function sizeof(str, charset) {
  var total = 0,
    charCode,
    i,
    len;
  charset = charset ? charset.toLowerCase() : '';
  if (charset === 'utf-16' || charset === 'utf16') {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0xffff) {
        total += 2;
      } else {
        total += 4;
      }
    }
  } else {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0x007f) {
        total += 1;
      } else if (charCode <= 0x07ff) {
        total += 2;
      } else if (charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }
  }
  return total;
}
class ContentBox extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleConfirmClose = this.handleConfirmClose.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.props.content[name] = value;
  }
  handleTextAreaChange(event) {//handle array input
    console.info('THIS.PROPS.CONTENT', this.props.content);
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    value = value && value.split('\n');
    this.setState({
      [name]: value
    });
    this.props.content[name] = value;
  }
  handleSelectChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.props.content[name] = value;
  }
  handleDeleteConfirm() {
    this.setState({ confirmShow: true });
  }
  handleConfirmClose() {
    this.setState({ confirmShow: false });
  }
  deleteConfirm(state, index) {
    const { contentType, save, content } = this.props;
    console.info('DELETECONFIRM', contentType);
    save(state, content.id || index, 'delete');
    // window.location = `/dashboard/list/${contentType}`;
    setTimeout(() => {
      window.location = `/dashboard/list/${contentType}`;
    }, 10);
  }
  addItem(state, index) {
    const { contentType, save, content } = this.props;
    save(state, content.id || index, '', 'add');
    // save(state, content.id || index, 'delete');
    setTimeout(() => {
      window.location = `/dashboard/list/${contentType}`;
    }, 10);

  }
  render() {
    let { content, save, loading, buttonState, index, sum, add } = this.props;
    console.info('___content', content);
    sum = sum || 0;
    let order = content.order || this.props.order || index || 1;
    const handleInputChange = this.handleInputChange;
    const handleTextAreaChange = this.handleTextAreaChange;
    const handleSelectChange = this.handleSelectChange;
    const deleteConfirm = this.deleteConfirm;
    const addItem = this.addItem;
    const state = this.state || {};
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

    let orderRow;
    if (index >= 0 || add > 0) {
      let options = [];
      // console.info('~~~~', sum, add > 0 ? (+sum + 1) : sum);
      options.length = add > 0 ? (+sum + 1) : sum;
      options.fill(1);
      options = options.map((item, index) => {
        const order = index + 1;
        return (<option value={order}>{order}</option>);
      });
      if (add > 0) {
        order = sum + 1;
      }
      orderRow = (
        <div className={styles.row}>
          <label className={styles.caption} htmlFor={`id_order`}>顺序</label>
          <select value={order} name="order" id="id_order" onChange={handleSelectChange}>
            {options}
          </select>
        </div>
      );
    }
    const rows = Object.keys(content).map(key => {
      let caption = content._caption && content._caption[key] || key;
      if (key === 'order') {
        return;
      }
      const value = content[key];
      switch (typeof content[key]) {
        case 'string':
          if (sizeof(content[key]) <= 100) {
            return (
              <div className={styles.row}>
                <label className={styles.caption} htmlFor={`id_${key}`}>{caption}</label>
                <input name={key} className={styles.blank} id={`id_${key}`} type="text" value={value} onChange={handleInputChange} />
              </div>
            );
          }
          return (
            <div className={styles.row}>
              <label className={styles.caption1} htmlFor={`id_${key}`}>{caption}</label>
              <textarea className={styles.blank1} name={key} id={`id_${key}`} value={value} onChange={handleInputChange}></textarea>
            </div>
          );
        case 'object':
          if (content[key] instanceof Array) {
            let text = '';
            content[key].forEach(function (element, index) {
              const item = typeof element === 'object' ? JSON.stringify(element) : element;
              if (text === '') {
                return text += item;
              }
              return text += `\n${item}`;
            }, this);

            return (
              <div className={styles.row}>
                <label className={styles.caption1} htmlFor={`id_${key}`}>{caption}</label>
                <textarea className={styles.blank1} name={key} id={`id_${key}`} value={text} onChange={handleTextAreaChange}></textarea>
              </div>
            );
          }
        default:
          return;
      }
    });
    const confirmActions = [
      <FlatButton
        label="确定"
        secondary={true}
        onTouchTap={() => deleteConfirm(this.state, index)}
      />,
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleConfirmClose}
      />,
    ];
    const updateBtn = (
      <div>
        <div className={styles['submit-row']} >
          <RaisedButton onClick={() => save(this.state, content.id || index)} label={buttonStates[buttonState].caption} buttonStyle={buttonStates[buttonState].style} primary={true} disabled={content.loading} />
        </div>
        <div className={styles['submit-row']} >
          <FlatButton onTouchTap={this.handleDeleteConfirm} label="删除" secondary={true} />
          <Dialog
            title="即将删除该数据"
            actions={confirmActions}
            modal={false}
            open={state.confirmShow}
            onRequestClose={this.handleConfirmClose}
          >
            该项数据删除后无法恢复，确定要这样做吗？
            </Dialog>
        </div>
      </div>
    );
    const addBtn = (
      <div>
        <div className={styles['submit-row']} >
          <RaisedButton onClick={() => addItem(this.state, index)} label="添加" buttonStyle={buttonStates[buttonState].style} primary={true} disabled={content.loading} />
        </div>
      </div>
    );
    const submitBtn = add > 0 ? addBtn : updateBtn;
    substance = (
      <div>
        {rows}
        {orderRow}
        {submitBtn}
      </div>
    );

    return (
      <div className={styles.box}>
        {substance}
      </div>
    );
  }
}

export default ContentBox;
