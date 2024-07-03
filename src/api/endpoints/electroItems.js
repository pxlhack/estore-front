import { getApiData, postApiData } from '../index';

const source = 'electro-item';

const getElectroItemsList = async () => {
    return getApiData(source);
};

const createElectroItem = async (electroItemData) => {
    return postApiData(source, electroItemData);
};

export { getElectroItemsList, createElectroItem }
