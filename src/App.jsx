
import { Login } from "./components/Login";
import { DashBoard } from "./components/DashBoard";
import { Callback } from "./components/Callback";
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/callback" element={<Callback/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
    )
}

export default App;
