import { getToken } from '../utils/user';

async function request(url, options) {
    try {
        const response = await fetch(url, options);


        if (response.status <= 199 || response.status >= 300) {
            const err = await response.json();
            throw new Error(err.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (error) {
        throw error;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    const token = getToken();
    if (token !== null) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;

}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('post', data));
}

export async function register(user) {
    const result = await post('/api/v1/auth/register', user);

    const data = {
        id: result._id,
        name: result.name,
        email: result.email,
    };

    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', result.token);

    return result;
}
export async function login(user) {
    const result = await post('/api/v1/auth/login', user);

    const data = {
        id: result._id,
        name: result.name,
        email: result.email,
    };

    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', result.token);

    return result;
}

// # Jobs
export async function createJobOffer(job) {
    const result = await post('/api/v1/job/add-job', job);
    return result;
}