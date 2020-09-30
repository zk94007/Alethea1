import {DEV_REQUEST, DEV_STATUS, TEXT_SPEECH} from "../utils/endpoints";

export async function requestText2Speech(body) {
    const response = await fetch(
        TEXT_SPEECH,
        {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );
    return response.ok ? response.json() : null;
}

export async function requestGetResult(body) {
    console.log('requestGetResult => ', body)
    const response = await fetch(
        DEV_REQUEST,
        {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );
    return response.ok ? response.json() : null;
}

export async function requestGetStatus(body) {
    const response = await fetch(
        DEV_STATUS,
        {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("admin:Mx9fncRCaMjIoKhyWmO3JPK5dPS4BgxI"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );
    return response.ok ? response.json() : null;
}
