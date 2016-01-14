import React from 'react';
import { loadFromGithub } from '../utils';

export default class IssueDetail extends React.Component {

    constructor() {
        super();
        this.state = { issue: {} }
    }

    componentDidMount() {
        loadFromGithub('/repos/npm/npm/issues/' + this.props.params.issueId)
            .then(data => this.setState({ issue: data }))
            .catch(e => console.error(e));
    }

    render() {
        return (
            <div className="issue-detail">{this.state.issue.title}</div>
        )
    }
}
