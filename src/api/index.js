import axios from 'axios';

const apiUrl = 'http://localhost:8081/estore/api';

const getApiData = async (endpoint) => {
    try {
        console.log(endpoint);
        const response = await axios.get(`${apiUrl}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getById = async (source, id) => {
    return getApiData(`${source}/${id}`);
};


const postApiData = async (endpoint, data) => {
    try {
        console.log(endpoint);
        console.log(data);
        const response = await axios.post(`${apiUrl}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

const putApiData = async (endpoint, data) => {
    try {
        const response = await axios.put(`${apiUrl}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

const deleteApiData = async (endpoint) => {
    try {
        const response = await axios.delete(`${apiUrl}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};

export { getApiData, postApiData, putApiData, deleteApiData, getById };