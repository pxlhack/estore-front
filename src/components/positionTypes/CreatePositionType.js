import React, { useState } from "react";
import { createPositionType } from "../../api/endpoints/positionTypes";

const CreatePositionType = ({ onPositionTypeCreated }) => {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCreatePositionType = async () => {
        try {
            const newPurchaseType = {
                name: name
            };

            let data = await createPositionType(newPurchaseType);

            setName('');

            onPositionTypeCreated(data);
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

            <button onClick={handleCreatePositionType}>Создать</button>
        </div>
    );
}

export default CreatePositionType;