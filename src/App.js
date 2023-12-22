import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
                          dashbaord
        </Routes>
    )
}

export default App;