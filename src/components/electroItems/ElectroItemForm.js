import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ElectroItemForm = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [types, setTypes] = useState([]);

    useEffect(() => {
        // Fetch the product types from an API endpoint
        axios.get('http://your-api-endpoint.com/types')
            .then(response => {
                setTypes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the product types!', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, type, price, quantity, description };

        axios.post('http://your-api-endpoint.com/submitProduct', product)
            .then(response => {
                console.log('Product added:', response.data);
                // Reset form fields
                setName('');
                setType('');
                setPrice('');
                setQuantity('');
                setDescription('');
            })
            .catch(error => {
                console.error('There was an error adding the product!', error);
            });
    };

    return (
        <div>
            <h1>Добавить новый товар</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Название товара:</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    maxLength="150"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <label htmlFor="type">Тип товара:</label><br />
                <select
                    id="type"
                    name="type"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Выберите тип</option>
                    {types.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
                <br /><br />

                <label htmlFor="price">Цена (в рублях):</label><br />
                <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br /><br />

                <label htmlFor="quantity">Количество:</label><br />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <br /><br />

                <label htmlFor="description">Описание товара:</label><br />
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br /><br />

                <input type="submit" value="Добавить товар" />
            </form>
        </div>
    );
};

export default ElectroItemForm;