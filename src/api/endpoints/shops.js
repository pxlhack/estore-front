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

export { getShopsList, createShop, getTotalPriceForCashPurchases }