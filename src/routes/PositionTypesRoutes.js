import { Route, Routes } from "react-router-dom";
import PositionTypesPage from "../components/positionTypes/PositionTypesPage";

const PositionTypesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PositionTypesPage />} />
        </Routes>
    );
}

export default PositionTypesRoutes;