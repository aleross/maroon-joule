import React from 'react';
import Issue from './Issue';

export default class Issues extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="issues">
                <Issue/>
            </div>
        )
    }
}
