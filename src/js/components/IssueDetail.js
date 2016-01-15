import React from 'react';
import { loadFromGithub } from '../utils';
import Comments from './Comments';

export default class IssueDetail extends React.Component {

    constructor() {
        super();
        this.state = { issue: null }
    }

    componentDidMount() {
        this._fetchIssue();
    }

    componentDidUpdate(prevProps) {
        let prevPage = prevProps.params.issueId;
        let newPage =  this.props.params.issueId;
        if (prevPage !== newPage) {
            this._fetchIssue();
        }
    }

    // Prevents in-progress API call from changing state
    componentWillUnmount() {
        this.ignoreLastFetch = true;
    }

    _fetchIssue() {
        let { issueId } = this.props.params;
        loadFromGithub(`/repos/npm/npm/issues/${issueId}`)
            .then(data => {
                if (!this.ignoreLastFetch) {
                    this.setState({ issue: data });
                }
            })
            .catch(e => console.error(e));
    }

    render() {
        let issue = this.state.issue;
        if (issue) {
            return (
                <div id="issue-detail">
                    <span className="detail-state label">{issue.state}</span>
                    <header className="detail-header">
                        <a className="detail-avatar" href={issue.user.html_url}>
                            <img src={issue.user.avatar_url}/>
                        </a>
                        <span className="detail-username"><a href={issue.user.html_url}>@{issue.user.login}</a> opened 3 days ago</span>
                        <h3 className="detail-title">{issue.title} <span className="detail-number">#{issue.number}</span></h3>
                    </header>
                    <section className="detail-body">{issue.body}</section>
                    <section className="detail-comments">
                        <Comments issue={issue}/>
                    </section>
                </div>
            )
        } else {
            return (<p>Loading</p>)
        }
    }
}
