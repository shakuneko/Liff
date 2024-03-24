import './App.css';
import React from 'react';
import { BrowserRouter, Route,Routes} from "react-router-dom";
import List from './page/List';
import ItemsPage from './page/ItemsPage';
import TaskPieChart from './page/TaskPieChart';
function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />} />
            </Routes>
            <Routes>
                <Route path="/item" element={<ItemsPage />} />
            </Routes>
            <Routes>
                <Route path="/chart" element={<TaskPieChart />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
