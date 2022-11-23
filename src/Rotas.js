import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';

import AuthService from './services/Auth.service';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import CrudLivro from './components/CrudLivro/CrudLivro'
import ListaLivro from './components/ListaLivro/ListaLivro';
import telaCliente from './components/telaCliente/telaCliente';
import meusLivros from './components/meusLivros/meusLivros';
export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            
            setCurrentUser(user);

        }
    }, []);
    return (
        <Routes>
           
            {currentUser ? (
                <Route exact path='/cursos'
                    element={
                        <Main title="Cursos">
                            <div>Página de cursos...</div>
                        </Main>
                    }
                />
            ) : (
                <Route exact path='/cursos'
                    element={
                        <Main title="Cursos">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route exact path='/carometro'
                element={
                    <Main title="Carômetro">
                        <div>Carômetro...</div>
                    </Main>
                }
            />
            
            <Route path='/' element={<Login />} />
            <Route path='/biblioteca' element={<T />} />
            <Route path='/meusLivros' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
            <Route path="/livro" element={<CrudLivro/>}/>
         
        </Routes>
    )
}