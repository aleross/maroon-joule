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
        this.state.page = Number(this.props.params.page) || 1;
        loadFromGithub(`/repos/npm/npm/issues?page=${this.state.page}`)
            .then(data => {
                if (!this.ignoreLastFetch) {
                    this.setState({ issues: data });
                }
            })
            .catch(e => console.error(e));
    }

    // Load issues list when first mounted
    componentDidMount() {
        this.fetchIssues();
    }

    // Refresh issues list
    componentDidUpdate(prevProps) {
        let prevPage = prevProps.params.page;
        let newPage = this.props.params.page;
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
                        <li key={issue.number}><Link to={`/issue/${issue.number}`}>{issue.title}</Link></li>
                    ))}
                </ul>
                <Pagination page={this.state.page}/>
            </section>
        )
    }
}
