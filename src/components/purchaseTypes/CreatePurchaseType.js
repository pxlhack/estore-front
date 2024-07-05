import React, { useState } from "react";
import { createPurchaseType } from "../../api/endpoints/purchaseTypes";

const CreatePurchaseType = ({ onPurchaseTypeCreated }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCreatePurchaseType = async () => {
        try {
            const newPurchaseType = {
                name: name
            };

            let data = await createPurchaseType(newPurchaseType);

            setName('');

            onPurchaseTypeCreated(data);
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

            <button onClick={handleCreatePurchaseType}>Создать</button>
        </div>
    );
}

export default CreatePurchaseType;