import React from 'react';
import { Link } from 'react-router';
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
                    this.setState({ issues: data });
                }
            })
            .catch(e => console.error(e));
    }

    _getPage(props) {
        let { query } = props.location;
        return query ? (Number(query.page) || 1) : 1;
    }

    render() {
        return (
            <div id="content">
                <section id="issue-list">
                    <ul>
                        {this.state.issues.map(issue => (
                            <li key={issue.number}><Link to={`/issues/${issue.number}`}>{issue.title}</Link></li>
                        ))}
                    </ul>
                    <footer>
                        <Pagination page={this._getPage(this.props)}/>
                    </footer>
                </section>
                <section id="issue-detail">Select an issue</section>
            </div>
        )
    }
}
