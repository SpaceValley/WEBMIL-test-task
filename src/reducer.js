import * as actions from './constants';

const initialState = {
  posts: [],
  users: [],
  isLoading: false,
  userIdFilter: '1',
  clickedPost: {
    id: null,
    title: '',
    text: '',
  },
  postAuthorData: {
    name: '',
    username: '',
    email: '',
    website: '',
  },
  comments: [],
  fetchError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.GET_POSTS_START:
      return {
        ...state,
        isLoading: true,
        fetchError: false,
      };
    case actions.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case actions.GET_USERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case actions.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        fetchError: true,
      };
    case actions.FILTER_USER:
      const author = state.users[action.payload - 1];
      const authorData = {
        name: author.name,
        username: author.username,
        email: author.email,
        website: author.website,
      };
      return {
        ...state,
        userIdFilter: action.payload,
        isLoading: true,
        postAuthorData: authorData,
      };
    case actions.CLICKED_POST_SAVE:
      return {
        ...state,
        clickedPost: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
        },
      };
    case actions.GET_COMMENTS_START:
      return {
        ...state,
        isLoading: true,
        fetchError: false,
      };
    case actions.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
