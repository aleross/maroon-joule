import '../css/app.scss';

// TODO router

import 'babel-polyfill';
import HelloBox from './components/HelloBox';
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

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/issues" component={IssueList}/>
            <Route path="/issues/:issueId" component={IssueDetail}/>
        </Route>
    </Router>
), document.getElementById('content'));
