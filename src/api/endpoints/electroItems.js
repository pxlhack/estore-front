import { getApiData, postApiData } from '../index';

const source = 'electro-item';

const getElectroItemsList = async () => {
    return getApiData(source);
};

const getElectroItemsPage = async (page, size) => {
    return getApiData(`${source}/page?page=${page}&size=${size}`);
};

const createElectroItem = async (electroItemData) => {
    return postApiData(source, electroItemData);
};

export { getElectroItemsList, createElectroItem, getElectroItemsPage }