import React, { useState } from "react";
import { createElectroItem } from "../../api/endpoints/electroItems";

const CreateElectroItem = ({ onElectroItemCreated, electroTypes }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [defaultElectroTypeId] = useState(electroTypes.length > 0 ? electroTypes[0].id : '');
    const [electroTypeId, setElectroTypeId] = useState(defaultElectroTypeId);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleElectroTypeIdChange = (event) => {
        setElectroTypeId(event.target.value);
    };

    const handleCreateElectroItem = async () => {
        console.log(electroTypes);
        try {
            const newElectroItem = {
                name: name,
                price: parseInt(price),
                description: description,
                electroTypeId: parseInt(electroTypeId)
            };

            console.log(newElectroItem);

            let electroItemData = await createElectroItem(newElectroItem);

            setName('');
            setPrice(0);
            setDescription('');
            setElectroTypeId(defaultElectroTypeId);

            onElectroItemCreated(electroItemData);
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
                <label htmlFor="price">Цена:</label>
                <input type="text" id="price" value={price} onChange={handlePriceChange} />
            </div>

            <div>
                <label htmlFor="description">Описание:</label>
                <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
            </div>

            <div>
                <label htmlFor="electroType">Тип электроники:</label>
                <select id="electroType" value={electroTypeId} onChange={handleElectroTypeIdChange}>
                    {electroTypes.map(electroType => (
                        <option key={electroType.id} value={electroType.id}>
                            {electroType.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleCreateElectroItem}>Создать</button>
        </div>
    );
}

export default CreateElectroItem;