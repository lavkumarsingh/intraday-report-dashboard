import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import Layout from "./component/Layout";
import Holding from "./pages/Holdings";
import Trades from "./pages/Trades";

function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="" element={<ProtectedRoute auth={JSON.parse(localStorage.getItem("auth")).access_token} outlet={<Layout/>}/>}>
                <Route path="/dashboard" element={<ProtectedRoute auth={JSON.parse(localStorage.getItem("auth")).access_token} outlet={<Dashboard />}/>}/>
                <Route path="/trades" element={<ProtectedRoute auth={JSON.parse(localStorage.getItem("auth")).access_token} outlet={<Trades />}/>}/>
                <Route path="/holdings" element={<ProtectedRoute auth={JSON.parse(localStorage.getItem("auth")).access_token} outlet={<Holding />}/>}/>
            </Route>
        </Routes>
    )
}

export default App;