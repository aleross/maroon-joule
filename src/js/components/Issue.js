import React from 'react';

export default class Issue extends React.Component {

    constructor() {
        super();
    }

    render() {
        var loc = 'here',
            href = `test ${loc}`;
        return(
            <div className="issue" href={ href }>Issue</div>
        )
    }
}
