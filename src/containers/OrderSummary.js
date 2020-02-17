import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { authAxios } from "../utils";
import { orderSummaryURL } from '../constants'

class OrderSummary extends Component {

    state = {
        data: null,
        error: null,
        loading: false
      };


    componentDidMount() {
        this.handleFetchOrder()
    }


    handleFetchOrder = () => {
        this.setState({ loading: true });
        authAxios
          .get(orderSummaryURL)
          .then(res => {
            this.setState({ data: res.data, loading: false });
          })
          .catch(err => {
            if (err.response.status === 404) {
              this.setState({
                error: "You currently do not have an order",
                loading: false
              });
            } else {
              this.setState({ error: err, loading: false });
            }
          });
      };

      renderVariations = orderItem => {
        let text = '';
        orderItem.item_variations.forEach(iv => {
            text += `${iv.variation.name}: ${iv.value}`
        })
        return text;
      }

    render() {
        const { data, error, loading } = this.state;
        console.log(data)
        return (
            <div className="container">
        {error && (
          <div class="alert alert-primary">
          {JSON.stringify(error)}
        </div>
        )}
        {loading && (
          <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        )}
            {data && (
            <div class="row">
            <aside class="col-lg-9">
            <div class="card">
            <div class="table-responsive">
            <table class="table table-borderless table-shopping-cart">
            <thead class="text-muted">
            <tr class="small text-uppercase">
            <th scope="col">Product</th>
            <th scope="col" width="120">Quantity</th>
            <th scope="col" width="120">Price</th>
            <th scope="col" class="text-right d-none d-md-block" width="200"> </th>
            </tr>
            </thead>
            <tbody>
                {data.order_items.map(order_item => {
                    return (
                    <tr>
                    <td>
                    <figure class="itemside align-items-center">
                        <div class="aside"><img src={`${order_item.item.image}`} class="img-sm"></img></div>
                        <figcaption class="info">
                            <a href="#" class="title text-dark">{order_item.item.title}</a>
                            <p class="text-muted small">{order_item.item.description}</p>
                            <p class="text-muted small">{this.renderVariations(order_item)}</p>
                        </figcaption>
                    </figure>
                </td>
                <td>
                <p class="title text-dark">{order_item.quantity}</p>
                </td>
                <td>
                    <div class="price-wrap">
                        <var class="price">${order_item.item.price}</var>
                    </div>
                </td>
                <td class="text-right d-none d-md-block">
                <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                <a href="" class="btn btn-light"> Remove</a>
                </td>
                </tr>
                    )
                })}
            </tbody>
            </table>

            </div>

            <div class="card-body border-top">
                <p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
            </div>

            </div>

                </aside>
                <aside class="col-lg-3">

            <div class="card mb-3">
            <div class="card-body">
            <form>
                <div class="form-group">
                    <label>Have coupon?</label>
                    <div class="input-group">
                        <input type="text" class="form-control" name="" placeholder="Coupon code"></input>
                        <span class="input-group-append">
                            <button class="btn btn-primary">Apply</button>
                        </span>
                    </div>
                </div>
            </form>
            </div>
            </div>

            <div class="card">
            <div class="card-body">
                    <dl class="dlist-align">
                    <dt>Discount:</dt>
                    <dd class="text-right text-danger">- $10.00</dd>
                    </dl>
                    <dl class="dlist-align">
                    <dt>Total:</dt>
                    <dd class="text-right text-dark b"><strong>${data.total}</strong></dd>
                    </dl>
                    <hr></hr>
                    <p class="text-center mb-3">
                        <img src="bootstrap-ecommerce-html/images/misc/payments.png" height="26"></img>
                    </p>
                    <Link to='/checkout'>
                    <button class="btn btn-primary btn-block">Make Purchase </button>
                    </Link>
                    <a href="#" class="btn btn-light btn-block">Continue Shopping</a>
                </div>
                </div>

                </aside>
            </div>
            )}
            </div>
        )
    }
}


export default OrderSummary