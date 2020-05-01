import { SET_CITY, SET_TEMP_UNIT } from '../actions/actionTypes';

const city = (state = {}, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload;
    default:
      return state;
  }
};

const unit = (state = { abbr: '' }, action) => {
  switch (action.type) {
    case SET_TEMP_UNIT:
      return action.payload;
    default:
      return state;
  }
};

export { city, unit };
