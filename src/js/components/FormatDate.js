import React from 'react';
import moment from 'moment';

export default class FormatDate extends React.Component {

    constructor() {
        super();
    }

    render() {
        let mom = moment(this.props.datetime),
            format = this.props.format || 'MMM D, YYYY';
        return (<span className="timeAgo">{mom.format(format)}</span>)
    }
}

FormatDate.propTypes = { datetime: React.PropTypes.string.isRequired, format: React.PropTypes.string };
