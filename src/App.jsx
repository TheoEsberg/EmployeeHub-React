import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './Css/App.css'
// import SideBar from './Components/Sidebar'
import LoginForm from './Views/LoginForm'
import LoggedInPage from './Views/LoggedInPage'

const App = () => {

	return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" exact element={<LoginForm />} />
                    <Route path="/loggedIn" element={<LoggedInPageWithProps />} />
                </Routes>
            </div>
        </Router>
    );
}

const LoggedInPageWithProps = () => {
    const location = useLocation();
    const { email, password } = location.state || {};

    return <LoggedInPage email={email} password={password} />;
}

export default App
