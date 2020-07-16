import React from 'react';

export const Login = () => {

    const auth_url = "https://google.com";

    window.setTimeout(()=>{window.location.replace(auth_url)}, 2000);

    return (
        <h1>Login_Page</h1> // this page must be prettyfied
    ) 
}