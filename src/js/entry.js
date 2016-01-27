import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.scss';

// TODO router

import 'babel-polyfill';
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
            <div>
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
        <Route path="/" component={IssueList}>
            <Route path="/:issueId" component={IssueDetail}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('content-wrapper'));
