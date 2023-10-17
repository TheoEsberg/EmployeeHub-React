import React from 'react';

const LoggedInPage = ({ email, password }) => {
    console.log("Email in LoggedInPage:", email);
    console.log("Password in LoggedInPage:", password);

    return (
        <div>
            <h1>Welcome to the Logged In Page</h1>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </div>
    );
};

export default LoggedInPage;