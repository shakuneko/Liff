import './App.css';
import React from 'react';
import { BrowserRouter, Route,Routes} from "react-router-dom";
import List from './page/List';
import ItemsPage from './page/ItemsPage';
import TaskPieChart from './page/TaskPieChart';
import ItemCard from './page/ItemCard';
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
            <Routes>
                <Route path="/card" element={<ItemCard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
