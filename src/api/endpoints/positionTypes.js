import { getApiData, postApiData } from '../index';

const source = 'position-type';

const getPositionTypesList = async () => {
    return getApiData(source);
};

const createPositionType = async (data) => {
    return postApiData(source, data);
};

export { getPositionTypesList, createPositionType }