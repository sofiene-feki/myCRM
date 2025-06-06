import axios from 'axios';

const API_BASE_URL = 'https://mycrm-server.onrender.com/api';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/create-user`, userData, {});
};

export const updateUser = async (userId, userData) => {
  return await axios.put(`${API_BASE_URL}/update-user/${userId}`, userData, {});
};

export const deleteUser = async (uid) => {
  return await axios.delete(`${API_BASE_URL}/delete-user/${uid}`);
};

export const getUsers = async () => await axios.get(`${API_BASE_URL}/users`);
