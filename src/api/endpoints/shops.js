import { getApiData, postApiData } from '../index';

const source = 'shop';

const getShopsList = async () => {
    return getApiData(source);
};

const createShop = async (data) => {
    return postApiData(source, data);
};

export { getShopsList, createShop }