import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import TranslatePage from "./pages/TranslatePage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' index element={<Navigate to={'/translate'}/>} />
            <Route path='translate' element={<TranslatePage/>} />
            <Route path='history' element={<HistoryPage/>} />
        </Routes>
    );
};

export default AppRouter;