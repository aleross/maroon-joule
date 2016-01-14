import React from 'react';
import { Link } from 'react-router';
import { loadFromGithub } from '../utils';

export default class Pagination extends React.Component {

    // TODO:
    // - reload page count on page?

    constructor() {
        super();
        this.state = { currentPage: null, pages: [], totalPages: null }
    }

    // Load number of pages to know the range
    componentDidMount() {
        loadFromGithub('/repos/npm/npm').then(data => {
            this.state.totalPages = Math.ceil(data['open_issues_count'] / 25);
            this.buildPages();
        }).catch(e => console.error('Pagination error:', e));
    }

    // Update current page and pages range when page property changes
    componentWillReceiveProps(nextProps) {
        let page = Number(nextProps.page);
        if (this.state && this.state.currentPage !== page) {
            this.state.currentPage = page;
            this.buildPages();
        }
    }

    buildPages() {
        const maxPages = 11;
        let pages = [];
        let { currentPage, totalPages } = this.state;

        if (totalPages) {
            if (totalPages > maxPages) {
                let beg = [{ num: 1 }, { num: 2 }],
                    mid = [
                        { num: '...', classes: 'disabled' },
                        { num: currentPage - 2 },
                        { num: currentPage - 1 },
                        { num: currentPage, classes: 'active' },
                        { num: currentPage + 1 },
                        { num: currentPage + 2 },
                        { num: '...', classes: 'disabled' }
                    ],
                    end = [{ num: totalPages - 1 }, { num: totalPages }];
                pages.concat(beg, mid, end);
            }
        }

        this.setState({ pages: pages });
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    { this.state.pages.map(page => (
                        <li key={page.num} className={page.classes}><Link to={`/issues/${page.num}`}>{page.num}</Link></li>
                    ))}
                </ul>
            </nav>
        )
    }
}
