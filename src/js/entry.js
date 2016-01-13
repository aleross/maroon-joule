import '../css/app.scss';

// TODO router

// Import React and JS
import HelloBox from './components/HelloBox';
import Issues from './components/Issues';
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
            <Issues/>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/:issueId" component={IssueDetail}/>
        </Route>
    </Router>
), document.getElementById('content'));
