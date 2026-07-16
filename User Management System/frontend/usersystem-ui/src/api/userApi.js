import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getAllUsers = () => {
    return axios.get(API_URL);
};

export const getUser = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUser = (user) => {
    return axios.post(API_URL, user);
};

export const updateUser = (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const searchUsers = (firstName) => {
    return axios.get(`${API_URL}/search`, {
        params: {
            firstName: firstName
        }
    });
};

export const getUserCount = () => {
    return axios.get(`${API_URL}/dashboard/stats/count`);
};

export const get3mostRecentUsers = () => {
    return axios.get(`${API_URL}/recent`);
}

export const getAverageAge = () => {
    return axios.get(`${API_URL}/dashboard/stats/average-age`);
}

export const getNewTodayCount = () => {
    return axios.get(`${API_URL}/dashboard/stats/new-today`);
}