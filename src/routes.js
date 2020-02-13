import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ProductList from './containers/ProductList'
import OrderSummary from './containers/OrderSummary'
import Checkout from './containers/Checkout'

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/ordersummary" component={OrderSummary} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/checkout" component={Checkout} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
