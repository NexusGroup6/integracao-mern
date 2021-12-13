import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// IMPORTS ADMIN!!!
import Dashboard from './pages/admin/dashboard';

import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
import Login from './pages/admin/login';


//IMPORTS CLIENT!!!
import Home from './pages/admin/login';
import ProdutoDetails from './pages/client/produtos/produtos.details';

/*import PrivateRoute from './services/wAuth';*/

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                {/*ROTA CLIENT */ }
                <Route path="/" exact element={<Home/>} />
                <Route path="/produtos/:idProduto" exact element={<ProdutoDetails/>} />

                {/*ROTA ADMIN */}
                <Route path="/admin" exact element={<Dashboard/>} />
                <Route path="/admin/login" exact element={<Login/>} />

                <Route path="/admin/produtos" exact element={<Produtos/>} />
                <Route path="/admin/produtos/cadastrar" exact element={<ProdutoCadastrar/>} />
                <Route path="/admin/produtos/editar/:idProduto" exact element={<ProdutoEditar/>} />

                <Route path="/admin/usuarios" exact element={<Usuarios/>} />
                <Route path="/admin/usuarios/cadastrar" exact element={<UsuarioCadastrar/>} />
                <Route path="/admin/usuarios/editar/:idUsuario" exact element={<UsuarioEditar/>} />
            </Routes>
        </BrowserRouter>
    );
}
