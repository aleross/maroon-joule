import React from 'react';
import { Link } from 'react-router';
import { loadFromGithub } from '../utils';

export default class Pagination extends React.Component {

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
        let page = nextProps.page;
        if (this.state && this.state.currentPage !== page) {
            this.state.currentPage = page;
            this.buildPages();
        }
    }

    buildPages() {
        const maxPages = 9;
        const { currentPage, totalPages } = this.state;
        let pages = [];

        if (totalPages && currentPage) {

            // Populate the initial pages array with all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push({ label: i, num: i, classes: currentPage === i ? 'active': null });
            }

            // If we have more than the max number of pages, replace ranges
            // with ellipses depending on current page position
            if (totalPages > maxPages) {
                if (currentPage > 5) {
                    let diff = currentPage - 5;
                    pages.splice(2, diff, { label: '...', classes: 'disabled' });
                }
                if ((currentPage + 4) < totalPages) {
                    let diff = totalPages - (currentPage + 4),
                        currentIndex = pages.findIndex(function (page) {
                            return page.classes === 'active';
                        });
                    pages.splice(currentIndex + 3, diff, { label: '...', classes: 'disabled' });
                }
            }

            // Previous button
            pages.unshift({
                label: 'Previous',
                num: (currentPage > 1) ? currentPage - 1 : null,
                classes: (currentPage === 1) ? 'disabled' : null
            });

            // Next button
            pages.push({
                label: 'Next',
                num: (currentPage < totalPages) ? currentPage + 1 : null,
                classes: (currentPage === totalPages) ? 'disabled' : null
            });
        }

        this.setState({ pages: pages });
    }

    // Conditionally return anchor tag or simple
    // span without navigation abilities
    getPageElement(page) {
        if (page.num) {
            return (<Link onClick={this.onNavClick} to={`/issues?page=${page.num}`}>{page.label}</Link>)
        } else {
            return (<span>{page.label}</span>)
        }
    }

    // Remove sticky active effect when clicking on links
    onNavClick(event) {
        event.target.blur();
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    { this.state.pages.map((page, index) => {
                        return (<li key={index} className={page.classes}>{this.getPageElement(page)}</li>);
                    })}
                </ul>
            </nav>
        )
    }
}

Pagination.propTypes = { page: React.PropTypes.number.isRequired };
