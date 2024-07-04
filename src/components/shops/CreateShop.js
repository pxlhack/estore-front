import React, { useState } from "react";
import { createShop } from "../../api/endpoints/shops";

const CreateShop = ({ onShopCreated }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };


    const handleCreateShop = async () => {
        try {
            const newShop = {
                name: name,
                address: address
            };

            let shopData = await createShop(newShop);

            setName('');
            setAddress('');

            onShopCreated(shopData);
        }
        catch (error) {
            //check error
        }
    };


    return (
        <div className="container">
            <div>
                <label htmlFor="name">Название:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>

            <div>
                <label htmlFor="address">Адрес:</label>
                <input type="text" id="address" value={address} onChange={handleAddressChange} />
            </div>

            <button onClick={handleCreateShop}>Создать</button>
        </div>
    );
}

export default CreateShop;