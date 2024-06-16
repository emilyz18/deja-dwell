import axios from 'axios';

const URL_PATH = 'http://localhost:3000/users';

const handleResponse = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        if (error.response) {
            const errorMsg = error.response.data?.message;
            throw new Error(errorMsg);
        }
        throw error;
    }
};

const addUser = async (user) => {
    return handleResponse(() => axios.post(URL_PATH, user));
};

const getUsers = async () => {
    return handleResponse(() => axios.get(URL_PATH));
};

const deleteUser = async (userId) => {
    await handleResponse(() => axios.delete(`${URL_PATH}/${userId}`));
    return userId;
};

const patchUser = async (user) => {
    return handleResponse(() => axios.patch(`${URL_PATH}/${user.id}`, user));
};

const putUser = async (user) => {
    return handleResponse(() => axios.put(`${URL_PATH}/${user.id}`, user));
};

export default {
    addUser,
    getUsers,
    deleteUser,
    patchUser,
    putUser,
};
