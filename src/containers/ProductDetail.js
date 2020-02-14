import React from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { productDetailURL, addToCartURL } from '../constants'
import { fetchCart } from "../store/actions/cart";
import { authAxios } from '../utils'


class ProductDetail extends React.Component {
    
    state = {
        loading: false,
        error: null,
        data: []
      };

    componentDidMount() {
    const {match: { params }} = this.props
    axios
      .get(productDetailURL(params.productID))
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
    }

    handleAddToCart = slug => {
        this.setState({ loading: true });
        authAxios
          .post(addToCartURL, { slug })
          .then(res => {
            this.setState({ loading: false });
          })
          .catch(err => {
            this.setState({ error: err, loading: false });
          });
      };

    render() {
        console.log(this.props)
        const { data, error, loading } = this.state;
        const  item  = data
        return (
            <div>
            <div class="container">
            {error && (
            <div class="alert alert-danger" role="alert">
            {JSON.stringify(error) }
            </div>
            )}
            {loading && (
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            )}
            <div class="card">
	<div class="row no-gutters">
		<aside class="col-md-6">
<article class="gallery-wrap">
<div class="img-big-wrap">
  <div> <a href="#"><img src="/images/items/12.jpg"></img></a></div>
</div>
<div class="thumbs-wrap">
  <a href="#" class="item-thumb"> <img src="/images/items/12.jpg"></img></a>
  <a href="#" class="item-thumb"> <img src="/images/items/12-1.jpg"></img></a>
  <a href="#" class="item-thumb"> <img src="/images/items/12-2.jpg"></img></a>
</div>
</article> 
		</aside>
		<main class="col-md-6 border-left">
<article class="content-body">

<h2 class="title">{item.title}</h2>

<div class="rating-wrap my-3">
	<ul class="rating-stars">
		<li  class="stars-active">
			<i class="fa fa-star"></i> <i class="fa fa-star"></i>
			<i class="fa fa-star"></i> <i class="fa fa-star"></i>
			<i class="fa fa-star"></i>
		</li>
		<li>
			<i class="fa fa-star"></i> <i class="fa fa-star"></i>
			<i class="fa fa-star"></i> <i class="fa fa-star"></i>
			<i class="fa fa-star"></i>
		</li>
	</ul>
	<small class="label-rating text-muted">132 reviews</small>
	<small class="label-rating text-success"> <i class="fa fa-clipboard-check"></i> 154 orders </small>
</div>

<div class="mb-3">
	<var class="price h4">${item.price}</var>
</div>

<p>{item.description}</p>


<dl class="row">
  <dt class="col-sm-3">Model#</dt>
  <dd class="col-sm-9">Odsy-1000</dd>

  <dt class="col-sm-3">Color</dt>
  <dd class="col-sm-9">Brown</dd>

  <dt class="col-sm-3">Delivery</dt>
  <dd class="col-sm-9">Russia, USA, and Europe </dd>
</dl>

<hr></hr>
	<div class="form-row">
		<div class="form-group col-md flex-grow-0">
			<label>Quantity</label>
			<div class="input-group mb-3 input-spinner">
			  <div class="input-group-prepend">
			    <button class="btn btn-light" type="button" id="button-plus"> + </button>
			  </div>
			  <input type="text" class="form-control" value="1"></input>
			  <div class="input-group-append">
			    <button class="btn btn-light" type="button" id="button-minus"> − </button>
			  </div>
			</div>
		</div>
		<div class="form-group col-md">
				<label>Select size</label>
				<div class="mt-1">
					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" checked="" class="custom-control-input"></input>
					  <div class="custom-control-label">Small</div>
					</label>

					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" class="custom-control-input"></input>
					  <div class="custom-control-label">Medium</div>
					</label>

					<label class="custom-control custom-radio custom-control-inline">
					  <input type="radio" name="select_size" class="custom-control-input"></input>
					  <div class="custom-control-label">Large</div>
					</label>

				</div>
		</div>
	</div>

	<a href="#" class="btn  btn-primary"> Buy now </a>
	<a href="#" class="btn  btn-outline-primary"> <span class="text">Add to cart</span> <i class="fas fa-shopping-cart"></i>  </a>
</article>
		</main>
	</div>
</div>
            </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
      refreshCart: () => dispatch(fetchCart())
    };
  };
  
  export default withRouter(
    connect(
      null,
      mapDispatchToProps
    )(ProductDetail)
  );