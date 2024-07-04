import { Route, Routes } from "react-router-dom";
import PurchasesPages from "../components/purchases/PurchasesPage";

const PurchasesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PurchasesPages />} />
        </Routes>
    );
}

export default PurchasesRoutes;