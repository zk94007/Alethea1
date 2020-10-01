import {all, call, put, takeLatest} from 'redux-saga/effects';
import {requestGetResult, requestGetStatus, requestText2Speech} from '../../services/http_client';
import {
    APP_READY,
    APP_WAITING,
    GET_RESULT_ERROR,
    GET_RESULT_REQUEST,
    GET_RESULT_SUCCESS,
    GET_STATUS_ERROR,
    GET_STATUS_REQUEST,
    GET_STATUS_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS,
    SELECT_VIDEO_ID,
    SET_VIDEO_ID,
    TEXT_TO_SPEECH_ERROR,
    TEXT_TO_SPEECH_REQUEST,
    TEXT_TO_SPEECH_SUCCESS
} from "./constants";
import history from "../../routes/history";

function* handleRequestText2Speech(action) {
    yield put({type: APP_WAITING});
    try {
        const {body} = action;
        const {status, payload} = yield call(requestText2Speech, body);
        console.log(status, payload)
        if (status) {
            yield put({
                type: TEXT_TO_SPEECH_SUCCESS,
                resultKey: payload.resultKey
            });
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: TEXT_TO_SPEECH_ERROR,
            msg: 'TEXT_TO_SPEECH_ERROR: the connection was failed.'
        });
    }
}

function* handleRequestGetResult(action) {
    yield put({type: APP_WAITING});
    console.log(action)
    try {
        const {body} = action;
        const {status, payload} = yield call(requestGetResult, body);
        console.log(status, payload)
        if (status) {
            yield put({
                type: GET_RESULT_SUCCESS,
                resultKey: payload.jobId
            });
        } else {
            console.log(status, payload);
            yield put({
                type: GET_RESULT_ERROR,
                msg: 'GET_RESULT_ERROR: the connection was failed.'
            });
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_RESULT_ERROR,
            msg: 'GET_RESULT_ERROR: the connection was failed.'
        });
    }
}

function* handleRequestGetStatus(action) {
    yield put({type: APP_WAITING});
    try {
        const {body} = action;
        const {status, payload} = yield call(requestGetStatus, body);

        if (status) {
            if (payload.jobStatus === 'finished') {
                yield put({
                    type: GET_STATUS_SUCCESS,
                    resultKey: payload
                });
                yield put({type: APP_READY});
                history.push('/hello');
            } else {
                yield put({
                    type: GET_STATUS_SUCCESS,
                    resultKey: payload
                });
            }
        } else {
            console.log(status, payload);
            yield put({
                type: GET_STATUS_ERROR,
                msg: 'GET_STATUS_ERROR: the connection was failed.'
            });
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: GET_STATUS_ERROR,
            msg: 'GET_STATUS_ERROR: the connection was failed.'
        });
    }
}

function* handleSelectVideoId(action) {
    const {id} = action;
    yield put({type: SET_VIDEO_ID, id});
}

function* handleLoginRequest(action) {
    
    const {body} = action;
    if (body.email === 'alethea@test.com' && body.password === '123456') {
        console.log("sagas : LOGIN_SUCCESS");
        yield put({type: LOGIN_SUCCESS, authToken: btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI")})
    } else {
        yield put({type: LOGIN_ERROR, msg: 'Wrong username or password!'})
    }
}

export default all([
    takeLatest(TEXT_TO_SPEECH_REQUEST, handleRequestText2Speech),
    takeLatest(GET_RESULT_REQUEST, handleRequestGetResult),
    takeLatest(GET_STATUS_REQUEST, handleRequestGetStatus),
    takeLatest(SELECT_VIDEO_ID, handleSelectVideoId),
    takeLatest(LOGIN_REQUEST, handleLoginRequest)
]);
