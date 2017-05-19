import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Content from '../containers/Content';
import Projects from '../containers/Projects';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import Nav from '../containers/Nav';

const nav_items = [{
  type: 'nav',
  title: '导航配置',
  link: '/dashboard/nav'
}, {
  type: 'projects',
  title: '项目列表',
  link: '/dashboard/projects'
}, {
  type:'contact',
  title:'联系方式',
  link:'/dashboard/contact'
}];
const left = <Nav items={nav_items} />;
const right = (
  <div>
    <Switch>
      <Route exact path="/dashboard/" render={() => <div>index</div>} />
      <Route path="/dashboard/:content" component={Content} />
    </Switch>
  </div>
);

export default (
  <Router>
    <Layout left={left} right={right}></Layout>
  </Router>
);
