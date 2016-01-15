import React from 'react';
import moment from 'moment';

export default class TimeAgo extends React.Component {

    constructor() {
        super();
    }

    render() {
        let mom = moment(this.props.datetime);
        return (<span className="timeAgo">{mom.fromNow()}</span>)
    }
}

TimeAgo.propTypes = { datetime: React.PropTypes.string.isRequired };
