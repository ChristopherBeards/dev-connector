import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, editComment } from '../../actions/postActions';
import InputGroup from '../common/InputGroup';

class CommentItem extends Component {
  state = {
    editClicked: false,
    text: '',
  };

  componentDidMount() {
    this.setState({
      text: this.props.comment.text,
    });
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  onEditClick = () => {
    this.setState({ editClicked: true });
  };

  onEditChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEditSubmit = e => {
    e.preventDefault();
    const postData = {
      postId: this.props.postId,
      commentId: this.props.comment._id,
      text: this.state.text,
    };

    this.props.editComment(postData);
    this.setState({ editClicked: false });
  };

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            {this.state.editClicked === false ? (
              <p className="lead">{comment.text}</p>
            ) : (
              <React.Fragment>
                <form onSubmit={this.onEditSubmit}>
                  <InputGroup
                    name="text"
                    placeholder=""
                    value={this.state.text}
                    onChange={this.onEditChange}
                    type="submit"
                  />
                  <button type="submit" className="btn btn-primary mr-1">
                    Update
                  </button>
                </form>
              </React.Fragment>
            )}

            {comment.user === auth.user.id &&
            this.state.editClicked === false ? (
              <React.Fragment>
                <button
                  onClick={this.onEditClick.bind(this, postId)}
                  type="button"
                  className="btn mr-1"
                >
                  <i className="fas fa-edit" />
                </button>
                <button
                  onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { deleteComment, editComment }
)(CommentItem);
