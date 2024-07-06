import { getApiData, postApiData } from '../index';

const source = 'shop';

const getShopsList = async () => {
    return getApiData(source);
};

const createShop = async (data) => {
    return postApiData(source, data);
};

const getTotalPriceForCashPurchases = async (id) => {
    return getApiData(`${source}/${id}/sales-sum-for-cash`);
}

const getEmployeesByShopId = async (id) => {
    return getApiData(`${source}/${id}/employee`)
}

export { getShopsList, createShop, getTotalPriceForCashPurchases, getEmployeesByShopId }