import { getApiData, postApiData } from '../index';

const source = 'employee';

const getEmployeesList = async () => {
    return getApiData(source);
};

const createEmployee = async (data) => {
    return postApiData(source, data);
};

const getTopEmployeesByPositionAndSalesSum = async () => {
    return getApiData(`${source}/top-by-position/sales-sum`)
}

const getTopEmployeesByPositionAndSalesCount = async () => {
    return getApiData(`${source}/top-by-position/sales-count`)
}

export { getEmployeesList, createEmployee, getTopEmployeesByPositionAndSalesSum, getTopEmployeesByPositionAndSalesCount }