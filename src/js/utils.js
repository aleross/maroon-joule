import 'whatwg-fetch';

export function githubApi(endpoint) {
    const host = 'https://api.github.com/repos/npm/npm';
    const url = host + endpoint;

    if (!endpoint) {
        throw new Error('Remote call must specify an endpoint. Given:' + endpoint);
    }

    console.log('Loading from:', url);

    return fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .then(checkData)
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

function checkData(data) {
    if (data['message']) {
        throw new Error(data['message']);
    } else {
        return data;
    }
}
