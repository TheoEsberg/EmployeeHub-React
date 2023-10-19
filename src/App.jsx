import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import './Css/App.css'

import LoginForm from './Views/LoginForm'
import LoggedInPage from './Views/LoggedInPage'


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/LoggedInPage" element={<LoggedInPageWithProps />} />
            </Routes>
        </Router>
    );
}

const LoggedInPageWithProps = () => {
    const location = useLocation();
    const { res } = location.state || {};

    return <LoggedInPage result={res} />;
}

export default App
