import React from 'react';
import Issue from './Issue';

export default class IssueList extends React.Component {

    constructor() {

    }

    render() {
        return (
            <div className="issue-list">
                <Issue/>
            </div>
        )
    }
}
