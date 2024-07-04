import { getApiData, postApiData } from '../index';

const source = 'employee';

const getEmployeesList = async () => {
    return getApiData(source);
};

const createEmployee = async (data) => {
    return postApiData(source, data);
};

export { getEmployeesList, createEmployee }