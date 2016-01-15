import React from 'react';
import { loadFromGithub } from '../utils';
import Comment from './Comment';

export default class Comments extends React.Component {

    constructor() {
        super();
        this.state = { comments: [] }
    }

    // Load comments list when first mounted
    componentDidMount() {
        this._fetchComments();
    }

    // Refresh comments list when changing issue
    componentDidUpdate(prevProps) {
        let prevIssue = prevProps.issue;
        let newIssue = this.props.issue;
        if (prevIssue !== newIssue) {
            this._fetchComments();
        }
    }

    // Prevents in-progress API call from changing state
    componentWillUnmount() {
        this.ignoreLastFetch = true;
    }

    _fetchComments() {
        let url = this.props.issue.comments_url.split('.com')[1]; // get the path
        loadFromGithub(url).then(comments => {
            if (!this.ignoreLastFetch) {
                this.setState({ comments: comments });
            }
        }).catch(e => console.error(e));
    }

    render() {
        return (
            <div className="comments-wrapper">
                { this.state.comments.map(comment => (
                    <Comment key={comment.id} data={comment}/>
                ))}
            </div>
        )
    }
}

Comments.propTypes = { issue: React.PropTypes.object.isRequired };
