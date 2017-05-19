import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import styles from './style.css';
import { NavLink, Link } from 'react-router-dom';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class NavBar extends Component {
  render() {
    let list = [];
    const { items, currentIndex, handleClick } = this.props;
    let default_index;
    if (items && items.length > 0) {
      list = items.map((item, index) => {
        if (window.location.href.indexOf(item.link) !== -1) {
          default_index = index;
        }
        return (
          <ListItem onClick={() => { handleClick(item.type) }} className={styles.item} value={index} key={item.type} containerElement={Link} to={item.link}>
            {item.title}
          </ListItem>
        );
      });
    }
    return (<div><div className={styles.logo}>Witarch</div><SelectableList defaultValue={default_index}>{list}</SelectableList></div>);
  }
}

export default NavBar;
