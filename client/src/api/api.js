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

export async function put(url, data) {
    return await request(url, createOptions('put', data));
}

export async function del(url, data) {
    return await request(url, createOptions('delete', data));
}

export async function register(user) {
    const result = await post('/api/v1/auth/register', user);

    const data = {
        _id: result._id,
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
        _id: result._id,
        name: result.name,
        email: result.email,
    };

    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', result.token);

    return result;
}

export async function update(user) {
    const result = await put('/api/v1/auth/update', user);
    return result;
}

// # Jobs
export async function createJobOffer(job) {
    const result = await post('/api/v1/job/add-job', job);
    return result;
}

export async function getAllJobs({ type, sort, term, page, seniority, skills }) {
    let url = `/api/v1/job/all-jobs?page=${page}&type=${type}&sort=${sort}&seniority=${seniority}&skills=${skills}`;
    if (term) {
        url = url + `&search=${term}`;
    }
    const result = await get(url);
    return result;
}


export async function getUserJobs() {
    const result = await get('/api/v1/job/my-jobs');
    return result;
}

export async function getStats() {
    const result = await get('/api/v1/job/stats');
    return result;
}

export async function removeJob(id) {
    const result = await del(`/api/v1/job/my-jobs/${id}`);
    return result;
}

export async function getJob(id) {
    const result = await get(`/api/v1/job/my-jobs/${id}`);
    return result;;
}

export async function updateJob(id, data) {
    const result = await put(`/api/v1/job/my-jobs/${id}`, data);
    const job = {
        company: result.company,
        position: result.position,
        type: result.type,
        seniority: result.seniority,
        skills: result.skills,
        description: result.description,
        jobLocation: result.jobLocation,
    };
    return job;
}

export async function jobApply(id) {
    const result = await post(`/api/v1/job/apply/${id}`);
    return result;
}

