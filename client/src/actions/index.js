import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

export const signInOut = (isSignedIn, userId) => {
  if (isSignedIn) {
    return {
      type: SIGN_IN,
      payload: userId
    };
  } else {
    return {
      type: SIGN_OUT
    };
  }

}

export const createStream = formValues => async (dispatch, getState) => { //getState() returns the Redux State Object
    // console.log('1',formValues);  //{title: "v", description: "v"}
    formValues.userId = getState().auth.userId;
    const response = await streams.post('/streams', formValues);
    dispatch({
        type: CREATE_STREAM,
        payload: response.data      //data is the prop where axios saves the returned data we are interested in
    });
    history.push('/');
}

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams');
    // console.log(response.data);  //[{…}, {…}, {…}, {…}]
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
}

export const fetchStream = id => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    });
}

export const editStream = (id, formValues) => async (dispatch, getState) => {
    const response = await streams.patch(`/streams/${id}`, formValues); //patch keeps existing props in the DB if not sent as part of the request
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });
    history.push('/');
}

export const deleteStream = id => async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({
        type: DELETE_STREAM,
        payload: id
    });
    history.push('/');
}
