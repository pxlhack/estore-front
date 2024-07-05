import { Route, Routes } from "react-router-dom";
import PurchaseTypesPage from "../components/purchaseTypes/PurchaseTypesPage";

const PurchaseTypesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PurchaseTypesPage />} />
        </Routes>
    );
}

export default PurchaseTypesRoutes;