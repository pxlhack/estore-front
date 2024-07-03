import { getApiData, postApiData } from '../index';

const source = 'electro-type';

const getElectroTypesList = async () => {
    return getApiData(source);
};

const createElectroType = async (electroTypeData) => {
    return postApiData(source, electroTypeData);
};

export { getElectroTypesList, createElectroType }
