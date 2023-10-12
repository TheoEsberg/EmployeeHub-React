import React from 'react';

const LoggedInPage = ({ email, password }) => {
    return (
        <div>
            <h1>Welcome to the Logged In Page</h1>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
        </div>
    );
};

export default LoggedInPage;