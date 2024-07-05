import { getApiData, postApiData } from "../index";

const source = 'purchase';

const getPurchasesList = async () => {
    return getApiData(source);
}

const createPurchase = (data) => {
    return postApiData(source, data);
}

export { getPurchasesList, createPurchase }