import * as actions from './constants';

const initialState = {
  posts: [],
  isLoading: false,
  userIdPosts: '',
  clickedPost: {
    id: null,
    title: '',
    text: '',
  },
  comments: [],
  fetchError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.GET_POSTS_START:
      console.log('get posts START');
      return {
        ...state,
        isLoading: true,
        fetchError: false,
      };
    case actions.GET_POSTS_SUCCESS:
      console.log('get posts suc', action.payload);
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case actions.GET_DATA_FAILURE:
      console.log('get data FAILURE');
      return {
        ...state,
        isLoading: false,
        fetchError: true,
      };
    case actions.USER_ID_CHANGE:
      console.log('userId', action.payload);
      return {
        ...state,
        userIdPosts: action.payload,
        isLoading: true,
      };
    case actions.CLICKED_POST_SAVE:
      console.log('save clicked post', action.payload);
      return {
        ...state,
        clickedPost: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
        },
      };
    case actions.GET_COMMENTS_START:
      console.log('get comments START');
      return {
        ...state,
        isLoading: true,
        fetchError: false,
      };
    case actions.GET_COMMENTS_SUCCESS:
      console.log('get comments suc', action.payload);
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
