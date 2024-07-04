import '../styles/table.css'

const PurchasesTable = ({ purchases }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Товар</th>
                    <th>Магазин</th>
                    <th>Дата покупки</th>
                    <th>Способ оплаты</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map(purchase => (
                    <tr key={purchase.id}>
                        <td>{purchase.id}</td>
                        <td>{purchase.electroItem.name}</td>
                        <td>{purchase.shop.name}</td>
                        <td>{new Intl.DateTimeFormat('ru-RU').format(new Date(purchase.purchaseDate))}</td>
                        <td>{purchase.purchaseType.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PurchasesTable;