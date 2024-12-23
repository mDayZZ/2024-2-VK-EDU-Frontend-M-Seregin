import {Navigate, Route, Routes} from "react-router";
import TranslatePage from "./pages/TranslatePage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Navigate to={'translate'}/>}></Route>
                <Route path="translate" element={<TranslatePage/>}/>
                <Route path="history" element={<HistoryPage/>}/>
            </Routes>
        </div>
    );
};

export default AppRoutes;