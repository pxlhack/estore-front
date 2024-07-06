import { useEffect, useState } from "react";
import { getPositionTypesList } from '../../api/endpoints/positionTypes'
import Header from "../Header";
import '../styles/page.css'
import '../styles/table.css'
import Dialog from "../Dialog";
import CreatePositionType from "./CreatePositionType";

const PositionTypesPage = () => {
    const [positionTypes, setPositionTypes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };


    useEffect(() => {
        async function fetchPositionTypesList() {
            try {
                const [PositionTypesData] = await Promise.all([getPositionTypesList()]);

                setPositionTypes(PositionTypesData);

            } catch (error) {
                // Handle error
            }
        }

        fetchPositionTypesList();
    }, []);

    const handlePositionTypeCreated = (createdPositionType) => {
        setPositionTypes([...positionTypes, createdPositionType]);
    };

    return (
        <>
            <Header />

            <div className="page">

                <h2>Должности</h2>

                {positionTypes.length > 0 ? (
                    <div>

                        <button onClick={handleOpenDialog} className="add-button">
                            Добавить должность
                        </button>

                        {isDialogOpen && (
                            <Dialog
                                title="Добавить способ оплаты"
                                onClose={handleCloseDialog}
                                content={
                                    <CreatePositionType onPositionTypeCreated={handlePositionTypeCreated} />
                                }
                            />)}

                        <table className="table table-with-margin">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                </tr>
                            </thead>

                            <tbody>
                                {positionTypes.map(positionType => (
                                    <tr key={positionType.id}>
                                        <td>{positionType.id}</td>
                                        <td>{positionType.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                ) : (
                    <p>Загрузка должностей...</p>
                )}
            </div>
        </>
    );
};

export default PositionTypesPage;