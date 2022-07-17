import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import Login1 from './components/Login';
import fetchProduct from './components/FetchProduct';
import AddProduct from './components/AddProduct';

export default () => (
    <Layout>
        <Route exact path='/' component={Login1} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route path='/Login' component={Login1} />
        <Route path='/fetchProduct' component={fetchProduct} />
        <Route path='/addProduct' component={AddProduct} />
        <Route path='/Product/edit/:empid' component={AddProduct} />
    </Layout>
);
