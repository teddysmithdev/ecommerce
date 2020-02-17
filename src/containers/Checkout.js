import React, {Component, Fragment} from 'react';
import {injectStripe, Elements, CardElement} from 'react-stripe-elements';
import {StripeProvider} from 'react-stripe-elements';
import { authAxios } from '../utils';
import { checkoutURL, orderSummaryURL, addCouponURL } from '../constants'



class CouponForm extends Component {

    state = {
        code: ""
    }

    handleChange = e => {
        this.setState({
          code: e.target.value
        });
      };

    handleSubmit = e => {
        const {code} = this.state
        this.props.handleAddCoupon(e, code)
        this.setState({ code: ""})
    }
    render() {
        const { code } = this.state
        return (
            <Fragment>
                <div class="card mb-3">
                <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label>Have coupon?</label>
                    <div class="input-group">
                        <input type="text" class="form-control" value={code} onChange={this.handleChange} placeholder="Coupon code"></input>
                        <span class="input-group-append">
                            <button type="submit" class="btn btn-primary">Apply</button>
                        </span>
                    </div>
                </div>
                </form>
                </div>
                </div>
            </Fragment>

        )
    }
}


const OrderPreview = props => {
    const { data } = props;
    console.log(data)
        return (
            <Fragment>
                {data && (
                    <Fragment>
                    <article class="card-body">
                    <header class="mb-4">
                        <h4 class="card-title">Review cart</h4>
                    </header>
                        <div class="row">
                        {data.order_items.map(order_item => {
                            return (
                            <div class="col-md-6">
                                <figure class="itemside  mb-3">
                                    <div class="aside"><img src="images/items/1.jpg" class="border img-xs"></img></div>
                                    <figcaption class="info">
                                        <p>{order_item.item.title}</p>
                                        <span>{order_item.item.quantity}x ${order_item.item.price} = Total: ${data.total} </span>
                                    </figcaption>
                                </figure>
                            </div>
                            )
                        })}
                        </div>
                        </article>
                        <article class="card-body border-top">

                    <dl class="row">
                    <dt class="col-sm-10">Subtotal: <span class="float-right text-muted">2 items</span></dt>
                    <dd class="col-sm-2 text-right"><strong>$1,568</strong></dd>

                    {data.coupon && (
                    <Fragment>
                    <dt class="col-sm-10">Discount: {data.coupon.code} <span class="float-right text-muted"></span></dt>
                    <dd class="col-sm-2 text-danger text-right"><strong>${data.coupon.amount}</strong></dd>
                    </Fragment>
                    )}

                    <dt class="col-sm-10">Delivery charge: <span class="float-right text-muted">Express delivery</span></dt>
                    <dd class="col-sm-2 text-right"><strong>$120</strong></dd>

                    <dt class="col-sm-10">Tax: <span class="float-right text-muted">5%</span></dt>
                    <dd class="col-sm-2 text-right text-success"><strong>$7</strong></dd>

                    <dt class="col-sm-10">Order Total: ${data.total}</dt>
                    <dd class="col-sm-2 text-right"><strong class="h5 text-dark">$1,650</strong></dd>
                    </dl>
                </article>

                </Fragment>
                )}
            </Fragment>
        )
    }

class CheckoutForm extends React.Component {

    state = {
        data: null,
        loading: false,
        error: null,
        success: false
    }

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
    }

    submit = (ev) => {
    ev.preventDefault();
    this.setState({ loading: true })
    this.props.stripe.createToken().then(result => {
        if(result.error){
            this.setState({ error: result.error.message, loading: false })
        } else {
        authAxios
        .post(checkoutURL, {stripeToken: result.token.id})
        .then(res => {
            this.setState({ loading: false, success: true})
        })
        .catch(err => {
            this.setState({ loading: false, error: err})
        })   
        }     
    })
    
}

handleAddCoupon = (e, code) => {
    e.preventDefault();
    this.setState({ loading: true });
    authAxios
      .post(addCouponURL, { code })
      .then(res => {
        this.setState({ loading: false });
        this.handleFetchOrder();
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };
  render() {
      const { error, loading, success, data } = this.state
    return (
        <div>
        {/* {success && 
        <div>
        <div class="alert alert-primary">
            Payment successful!
          </div>
          <div class="alert alert-primary">
          Go to profile to see delivery status!
        </div> 
        </div>
        }
        {error && 
        <div class="alert alert-danger">
        Error: {error}
          </div>
        }
        {loading && (
          <div class="loading">
              loading...
            </div>
        )} */}
        <div className="container">
            <OrderPreview data={data} />
            <CouponForm
            handleAddCoupon={(e, code) => this.handleAddCoupon(e, code)}
            />
            <CardElement />
            <button class="btn btn-primary mt-4" onClick={this.submit}>Submit Payment</button>
        </div>
        </div>
    );
  }

}

const InjectedForm = injectStripe(CheckoutForm)

const WrappedForm = () => (
    <StripeProvider apiKey="pk_test_12345">
        <Elements>
            <InjectedForm />
        </Elements>
    </StripeProvider>
)


export default WrappedForm

