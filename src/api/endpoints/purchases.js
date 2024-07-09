import { getApiData, postApiData } from "../index";

const source = 'purchase';

const getPurchasesList = async () => {
    return getApiData(source);
}

const createPurchase = (data) => {
    return postApiData(source, data);
}

const getPurchasesPageSorted = async (page, size, ascending) => {
    return getApiData(`${source}/page/sort?page=${page}&size=${size}&ascending=${ascending}`);
};

export { getPurchasesList, createPurchase, getPurchasesPageSorted }