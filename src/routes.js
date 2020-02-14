import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ProductList from './containers/ProductList'
import ProductDetail from './containers/ProductDetail'
import CategoryList from './containers/CategoryList'
import OrderSummary from './containers/OrderSummary'
import Checkout from './containers/Checkout'

const BaseRouter = () => (
  <Hoc>
    <Route path="/products/:productID" component={ProductDetail} />
    <Route exact path="/category/:catergoryID" component={CategoryList} />
    <Route exact path="/products" component={ProductList} />
    <Route path="/ordersummary" component={OrderSummary} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/checkout" component={Checkout} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
