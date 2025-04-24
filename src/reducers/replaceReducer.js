const initialState = {
  showReplace: false,
  replaceValue: "",
};

// Action Types
const TOGGLE_REPLACE = "TOGGLE_REPLACE";
const SET_REPLACE_VALUE = "SET_REPLACE_VALUE";

// Reducer
export const replaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REPLACE:
      return { ...state, showReplace: !state.showReplace };
    case SET_REPLACE_VALUE:
      return { ...state, replaceValue: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const toggleReplace = () => ({
  type: TOGGLE_REPLACE,
});

export const setReplaceValue = (value) => ({
  type: SET_REPLACE_VALUE,
  payload: value,
});
