export const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_DETAILS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        userInfo: state.userInfo.filter((user) => user._id !== action.payload),
      };
    case "ADD_USER":
      return {
        ...state,
        userInfo: [...state.userInfo, action.payload],
      };
    case "SINGLE_USER_DETAILS":
      return {
        ...state,
        singleUser: action.payload,
      };
    case "DETAILS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
