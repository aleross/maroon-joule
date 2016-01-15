import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { loadFromGithub } from '../utils';
import Pagination from './Pagination';

export default class IssueList extends React.Component {

    // Todo:
    // - progress indicator
    // - error message

    constructor() {
        super();
        this.state = {
            issues: [],
            page: null
        };
    }

    // Load issues list when first mounted
    componentDidMount() {
        this._fetchIssues();
    }

    // Refresh issues list
    componentDidUpdate(prevProps) {
        let prevPage = this._getPage(prevProps);
        let newPage = this._getPage(this.props);
        if (prevPage !== newPage) {
            this._fetchIssues();
        }
    }

    // Prevents in-progress API call from changing state
    componentWillUnmount() {
        this.ignoreLastFetch = true;
    }

    _fetchIssues() {
        loadFromGithub(`/repos/npm/npm/issues?page=${this._getPage(this.props)}&per_page=25`)
            .then(data => {
                if (!this.ignoreLastFetch) {
                    data.forEach(issue => {
                        issue.body = issue.body.slice(0, 140);
                    });
                    this.setState({ issues: data });
                }
            })
            .catch(e => console.error(e));
    }

    _getPage(props) {
        let { query } = props.location;
        return query ? (Number(query.page) || 1) : 1;
    }

    _viewIssue(issue) {
        this.props.history.pushState(null, `/${issue.number}?page=${this._getPage(this.props)}`);
    }

    render() {
        return (
            <div id="content">
                <section id="issue-list">
                    <header>
                        <h2 id="issues-header">All Issues <small>(npm/npm)</small></h2>
                    </header>
                    <ul className="scroll">
                        {this.state.issues.map(issue => (
                            <li className="issue media" key={issue.number} onClick={this._viewIssue.bind(this, issue)}>
                                <div className="media-left">
                                    <img className="avatar" src={issue.user.avatar_url}/>
                                </div>
                                <div className="media-body">
                                    <header className="issue-header">
                                        <h4 className="issue-title">{issue.title}</h4>
                                        <span className="issue-meta">#{issue.number} opened by <a href={issue.user.html_url}>@{issue.user.login}</a></span>
                                    </header>
                                    <p className="issue-body">{issue.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <footer>
                        <Pagination page={this._getPage(this.props)}/>
                    </footer>
                </section>
                <section id="detail-wrapper">
                    {(() => {
                        if (this.props.params.issueId) {
                            return this.props.children;
                        } else {
                            return (<section id="select-issue">Select an issue</section>)
                        }
                    })()}
                </section>
            </div>
        )
    }
}
