import React from 'react';
import HelloText from './HelloText';

// Create class called HelloBox that extends the base React Component class
export default class HelloBox extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <HelloText name="Alex" />
        </div>
    }
}
