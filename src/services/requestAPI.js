
let customHeaders = (token = '') => {
    const defaultHeaders = {
        'Content-Type': 'application/json'
    };
    let headerObj = defaultHeaders;
    if (token) {
        const tokenHeader = {
            'Authorization': `Basic ${token}`,
        };
        headerObj = {
            ...defaultHeaders,
            tokenHeader
        }
    }
    return new Headers({
        ...headerObj
    });
};
let jsonResponse = (res) => {
    if (!res.ok) {
        let { status, statusText } = res;
        let message = JSON.stringify({status: status, statusText: statusText});
        throw Error( message );
    }
    return res.json();
};
export function getData(url) {
    const headers = customHeaders();
    return fetch(url, {
        headers: headers
    }).then((res) => {
        return jsonResponse(res);
    });
};
export function postData(url, body, token) {
    const headers = customHeaders(token);
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }).then((res) => {
        return jsonResponse(res);
    });
};
export function putData(url, body, token) {
    const headers = customHeaders(token);
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    }).then((res) => {
        return jsonResponse(res);
    });
};

export default { getData, postData, putData }

