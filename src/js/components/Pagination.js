import React from 'react';
import { Link } from 'react-router';
import { loadFromGithub } from '../utils';

export default class Pagination extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.info('Page:', this.props.page);
        loadFromGithub('/repos/npm/npm').then(data => {
            var pages = Math.ceil(data['open_issues_count'] / 25);
            console.log('Pages:', pages);
        }).catch(e => console.error('Pagination error:', e));
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li><Link to={`/issues/${1}`}>1</Link></li>
                    <li><Link to={`/issues/${2}`}>2</Link></li>
                </ul>
            </nav>
        )
    }
}
