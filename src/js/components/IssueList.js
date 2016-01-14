import React from 'react';
import { Link } from 'react-router';
import { githubApi } from '../utils';

export default class IssueList extends React.Component {

    constructor() {
        super();
        this.state = { issues: [] }
    }

    componentDidMount() {
        // Todo progress indicator and error handler
        githubApi('/issues').then(data => this.setState({ issues: data })).catch(e => console.error(e));
    }

    render() {
        return (
            <ul id="issue-list">
                {this.state.issues.map(issue => (
                    <li key={issue.id}><Link to={`/issue/${issue.id}`}>{issue.title}</Link></li>
                ))}
            </ul>
        )
    }
}
