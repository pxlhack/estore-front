
const ShopsTable = ({ shops }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Адрес</th>
                </tr>
            </thead>
            <tbody>
                {shops.map(shop => (
                    <tr key={shop.id}>
                        <td>{shop.id}</td>
                        <td>{shop.name}</td>
                        <td>{shop.address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ShopsTable;