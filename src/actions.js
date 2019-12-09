import NavigationService from './NavigationService';
import * as actions from './constants';
import axios from 'axios';

export const fetchPostsStart = () => {
  return dispatch => {
    dispatch({type: actions.GET_POSTS_START});
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({type: actions.GET_DATA_FAILURE});
      });
  };
};

export const fetchPostsSuccess = res => ({
  type: actions.GET_POSTS_SUCCESS,
  payload: res,
});

export const handleUserChange = userId => {
  return dispatch => {
    dispatch({type: actions.USER_ID_CHANGE, payload: userId});
    dispatch(fetchUserPostStart(userId));
  };
};

export const fetchUserPostStart = userId => {
  return dispatch => {
    dispatch({type: actions.GET_POSTS_START});
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({type: actions.GET_DATA_FAILURE});
      });
  };
};

export const saveClickedPostData = (id, title, text) => {
  return dispatch => {
    dispatch({type: actions.CLICKED_POST_SAVE, payload: {id, title, text}});
    dispatch(fetchPostCommentsStart(id));
    NavigationService.navigate('SinglePostScreen');
  };
};

export const fetchPostCommentsStart = id => {
  return dispatch => {
    dispatch({type: actions.GET_COMMENTS_START});
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/1/comments?postId=${id}`)
      .then(res => {
        dispatch(fetchPostCommentsSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({type: actions.GET_DATA_FAILURE});
      });
  };
};

export const fetchPostCommentsSuccess = res => ({
  type: actions.GET_COMMENTS_SUCCESS,
  payload: res,
});
