import React from 'react';

export default class Comment extends React.Component {

    constructor() {
        super();
    }

    render() {
        // Todo replace user name with @ link
        let comment = this.props.data;
        return (
            <div className="comment">
                <header className="comment-header">
                    <a href={comment.user.html_url}>@{comment.user.login}</a> commented 8 days ago:
                </header>
                <section className="comment-body">{comment.body}</section>
            </div>
        )
    }
}

Comment.propTypes = { data: React.PropTypes.object.isRequired };
