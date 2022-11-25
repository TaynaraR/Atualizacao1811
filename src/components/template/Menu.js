import React, { useEffect, useState } from 'react';
import '../template/Menu.js';
import { Link } from 'react-router-dom';
import AuthService from '../../services/Auth.service.js';
import './Menu.css'

export default function Menu(props) {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    return (
        <nav className='menu'>


            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/">
                    Login da locadora
                </Link>
            )}

            <Link to="/meusFilmes">
                Meus Filmes
            </Link>
            


        </nav>
    )
}