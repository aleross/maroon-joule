import React from 'react';
import FormatDate from './FormatDate';

export default class Comment extends React.Component {

    constructor() {
        super();
    }

    render() {
        let comment = this.props.data;
        return (
            <div className="comment">
                <header className="comment-header">
                    <a href={comment.user.html_url}>@{comment.user.login}</a> commented on <FormatDate datetime={comment.created_at}/>:
                </header>
                <section className="comment-body">{comment.body}</section>
            </div>
        )
    }
}

Comment.propTypes = { data: React.PropTypes.object.isRequired };
