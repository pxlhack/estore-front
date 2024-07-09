import { useState, useEffect } from "react";
import { addElectroItem } from "../../api/endpoints/shops";

const AddElectroItemToShop = ({ electroItemId, shops, onAddSuccess }) => {
    const [shopId, setShopId] = useState('');
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (shops && shops.length > 0) {
            setShopId(shops[0].id.toString());
        }
    }, [shops]);

    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
    };

    const handleCountChange = (event) => {
        setCount(parseInt(event.target.value));
    };

    const handleAddElectroItemToShop = async () => {
        try {
            let response = await addElectroItem(parseInt(shopId), electroItemId, count);
            alert(response);
            onAddSuccess();
        } catch (error) {
            console.error('Error adding electro item to shop:', error);
            alert('Произошла ошибка при добавлении товара в магазин');
        }
    };

    if (!shops || shops.length === 0) {
        return <p>Загрузка списка магазинов...</p>;
    }

    return (
        <div className="container">
            <div>
                <label htmlFor="count">Количество:</label>
                <input type="number" id="count" value={count} onChange={handleCountChange} min="1" />
            </div>

            <div>
                <label htmlFor="shop">Магазин:</label>
                <select id="shop" value={shopId} onChange={handleShopIdChange}>
                    {shops.map(shop => (
                        <option key={shop.id} value={shop.id.toString()}>
                            {shop.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleAddElectroItemToShop}>Добавить</button>
        </div>
    );
}

export default AddElectroItemToShop;