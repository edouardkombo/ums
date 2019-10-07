import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'admin-on-rest';
import authProvider from './authProvider';
import "./Logout.css";

const LogoutButton = ({ userLogout }) => (
    <button className="logout" onClick={logoutAction}>Logout</button>
);

function logoutAction() {
    authProvider('AUTH_LOGOUT', '');
}

export default connect(undefined, { userLogout })(LogoutButton);