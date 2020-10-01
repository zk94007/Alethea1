import {
  GET_RESULT_REQUEST,
  GET_STATUS_REQUEST,
  LOGIN_REQUEST,
  SELECT_VIDEO_ID,
  TEXT_TO_SPEECH_REQUEST,
} from "./constants";

export const requestText2Speech = (body) => ({
  type: TEXT_TO_SPEECH_REQUEST,
  body,
});

export const requestGetResult = (body) => ({
  type: GET_RESULT_REQUEST,
  body,
});

export const requestGetStatus = (body) => ({
  type: GET_STATUS_REQUEST,
  body,
});

export const selectVideoId = ({ videoKey, voiceId }) => ({
  type: SELECT_VIDEO_ID,
  videoKey,
  voiceId,
});

export const requestLogin = (body) => ({
  type: LOGIN_REQUEST,
  body,
});
