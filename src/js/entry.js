import '../css/app.scss';
import 'bootstrap/dist/css/bootstrap.css';

// TODO router

import 'babel-polyfill';
import Issues from './components/Issues';
import IssueList from './components/IssueList';
import IssueDetail from './components/IssueDetail';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

class NoMatch extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <h1>Not found</h1>
        )
    }
}

// TODO:
// - 404 route
// - dynamic repo

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/issues/:page" component={IssueList}/>
            <Route path="/issue/:issueId" component={IssueDetail}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('content'));
