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

    fetchIssues() {
        loadFromGithub(`/repos/npm/npm/issues?page=${this.getPage(this.props)}&per_page=25`)
            .then(data => {
                if (!this.ignoreLastFetch) {
                    this.setState({ issues: data });
                }
            })
            .catch(e => console.error(e));
    }

    getPage(props) {
        let { query } = props.location;
        return query ? (Number(query.page) || 1) : 1;
    }

    // Load issues list when first mounted
    componentDidMount() {
        this.fetchIssues();
    }

    // Refresh issues list
    componentDidUpdate(prevProps) {
        let prevPage = this.getPage(prevProps);
        let newPage = this.getPage(this.props);
        if (prevPage !== newPage) {
            this.fetchIssues();
        }
    }

    // Prevents in-progress API call from changing state
    componentWillUnmount() {
        this.ignoreLastFetch = true;
    }

    render() {
        return (
            <section id="issues-list">
                <ul>
                    {this.state.issues.map(issue => (
                        <li key={issue.number}><Link to={`/issues/${issue.number}`}>{issue.title}</Link></li>
                    ))}
                </ul>
                <Pagination page={this.getPage(this.props)}/>
            </section>
        )
    }
}
