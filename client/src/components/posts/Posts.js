import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layouts/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {(loading ) ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <FontAwesomeIcon icon={faUser} /> Welcome to the community
          </p>
          <PostForm/>
          <div className='posts'>
          {posts.length > 0 ? (
            posts.map(post => (
                <PostItem key={post._id} onePost={post} />
              ))
            ) : (
              <h4>No post Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
