import { getApiData, postApiData } from '../index';

const source = 'purchase-type';

const getPurchaseTypesList = async () => {
    return getApiData(source);
};

const createPurchaseType = async (data) => {
    return postApiData(source, data);
};

export { getPurchaseTypesList, createPurchaseType }