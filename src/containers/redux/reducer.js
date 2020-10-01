import {
  APP_READY,
  APP_WAITING,
  GET_RESULT_ERROR,
  GET_RESULT_SUCCESS,
  GET_STATUS_ERROR,
  GET_STATUS_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SET_VIDEO_ID,
  TEXT_TO_SPEECH_ERROR,
  TEXT_TO_SPEECH_SUCCESS,
} from "./constants";

const initialState = {
  resultKey: "",
  jobId: "",
  videoKey: "",
  jobResult: {},
  isWaiting: false,
  errors: "",
  progress: 0,
  authToken: "",
  voiceId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEXT_TO_SPEECH_SUCCESS:
      return {
        ...state,
        resultKey: action.resultKey,
        jobId: "",
        jobResult: {},
      };
    case GET_RESULT_SUCCESS:
      return { ...state, jobId: action.resultKey };
    case GET_STATUS_SUCCESS:
      return { ...state, jobResult: action.resultKey };
    case SET_VIDEO_ID:
      return { ...state, videoKey: action.videoKey, voiceId: action.voiceId };
    case LOGIN_SUCCESS:
      return { ...state, authToken: action.authToken };
    case TEXT_TO_SPEECH_ERROR:
    case GET_RESULT_ERROR:
    case GET_STATUS_ERROR:
    case LOGIN_ERROR:
      return { ...state, errors: action.msg, isWaiting: false };
    case APP_WAITING:
      return { ...state, isWaiting: true };
    case APP_READY:
      return { ...state, isWaiting: false };
    default:
      return state;
  }
};
