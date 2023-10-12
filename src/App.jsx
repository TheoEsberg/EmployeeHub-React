import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
                    <Route path="/loggedIn" element={<LoggedInPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
