import React from 'react';
import ReactDOM from 'react-dom';
import About from './src/view/about';
import Inbox from './src/view/inbox';
import asyncComponent from './src/assets/js/AsyncComponent'
// const Inbox = asyncComponent(() => import( './src/view/inbox'));
// const About = asyncComponent(() => import( './src/view/about'));
import { BrowserRouter as Router, Switch, Redirect, Route, Link, HashRouter ,RouteChildren} from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
      <div className="shopping-list">
      {this.props.children}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <App>
            <Route path="/about" component={About} />
            <Route path="/inbox" component={Inbox} />
          </App>
        </Switch>
      </HashRouter>
    )
  }

}

ReactDOM.render(
  <Home />,
  document.getElementById('app')
);