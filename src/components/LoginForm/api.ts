const BackendUrl = process.env.REACT_APP_BACKEND_URL as string;

// Send a POST request to the server with the user's credentials, and return a promise that resolves to the response
function login(username: string, password: string, onSuccess: (body: {}) => void, onError: (error: string) => void): void {
    fetch(BackendUrl + 'auth/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
        },
        body: JSON.stringify({ username, password }),
    }).then((res) => {
        if (res.ok) {
            res.json().then((body) => {
                onSuccess(body);
            });
        } else {
            res.text().then((text) => {
                onError(text);
            });
        }
    }).catch((err) => {
        onError(err);
    });
}

export { login };