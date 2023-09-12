import React, { useContext } from 'react';
import { Routes, Route, Outlet, useParams, Navigate } from 'react-router-dom';

import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';

import { GlobalState } from '../../GlobalState';

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />

      <Route
        path="/login"
        element={isLogged ? <Navigate to="/not-found" /> : <Login />}
      />
      <Route
        path="/register"
        element={isLogged ? <Navigate to="/not-found" /> : <Register />}
      />

      <Route
        path="/category"
        element={isAdmin ? <Categories /> : <Navigate to="/not-found" />}
      />
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <Navigate to="/not-found" />}
      />
      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <Navigate to="/not-found" />}
      />

      <Route
        path="/history"
        element={isLogged ? <OrderHistory /> : <Navigate to="/not-found" />}
      />
      <Route
        path="/history/:id"
        element={isLogged ? <OrderDetails /> : <Navigate to="/not-found" />}
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="not-found" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default Pages;
