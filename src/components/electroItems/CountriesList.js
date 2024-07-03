import React, {useState, useEffect} from 'react';
import {getCountriesList} from "../../api/endpoints/countries";

function CountriesList() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function fetchCountriesList() {
            try {
                const data = await getCountriesList();
                setCountries(data);
            } catch (error) {
                // Handle error
            }
        }

        fetchCountriesList();
    }, []);

    return (
        <div>
            {countries.length > 0 ? (
                <div>
                    <h2>List of Countries</h2>
                    <ul>
                        {countries.map(country => (
                            <li key={country.id}>
                                <a href={`/countries/${country.id}`} style={{textDecoration: 0}}>
                                    <h3>{country.name}</h3>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading country data...</p>
            )}
        </div>
    );
}

export default CountriesList;