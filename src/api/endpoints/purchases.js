import { getApiData, postApiData } from "../index";

const source = 'purchase';

const getPurchasesList = async () => {
    return getApiData(source);
}

export { getPurchasesList }