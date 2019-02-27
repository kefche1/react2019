import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types';

// const INITIAL_STATE = {
//   isSignedIn: null,
//   userId: null
// };

export default (state = {}, action) => {  //[] used only once on redux boot; means if no value was passed use []

    switch (action.type) {
      case FETCH_STREAMS:
        //console.log(action.payload);  //[{…}, {…}, {…}, {…}]
        //console.log( { ...state, ..._.mapKeys(action.payload, 'id') } );  //{1: {…}, 2: {…}, 3: {…}, 4: {…}}
        return { ...state, ..._.mapKeys(action.payload, 'id') };  //the object of object streams
      case FETCH_STREAM:
        return { ...state, [action.payload.id] : action.payload };
      case CREATE_STREAM:
        return { ...state, [action.payload.id] : action.payload };
      case EDIT_STREAM:
        return { ...state, [action.payload.id] : action.payload };
      case DELETE_STREAM:
        return _.omit(state, action.payload);
      default:
        return state;
    }
}
