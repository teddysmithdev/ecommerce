import React, { Fragment } from 'react'
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
        formData: {},
        data: []
      };

    handleChange = (e) => {
      const { formData } = this.state
      const updatedFormData = {
        ...formData,
        [e.target.name]: e.target.value
      }
      this.setState({formData: updatedFormData})
    }

    handleFormatData = formData => {
      // convert {colour: 1, size: 2} to [1,2] - they're all variations
      return Object.keys(formData).map(key => {
        return formData[key];
      });
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
        const { formData } = this.state
        const variations = this.handleFormatData(formData)
        console.log(variations)
        authAxios
          .post(addToCartURL, { slug, variations })
          .then(res => {
            this.setState({ loading: false });
          })
          .catch(err => {
            this.setState({ error: err, loading: false });
          });
      };

    render() {
        console.log(this.state)
        const { data, error, loading, formData } = this.state;
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
		<div class="form-group col-md flex-grow-0">
    <form onSubmit={this.handleFormatData}>
    {data.variations &&
                data.variations.map(v => {
                  const name = v.name.toLowerCase()
                  return (
                    <Fragment key={v.id}>
                      {/* <div class="card"> */}
                      <div class="card-body">
                      <div class="form-inline d-inline-flex ml-luto">
                      <label as="h3">{v.name}</label>
                      <select className="ml-2 form-control" name={name}  onChange={this.handleChange}>
                   
                        {v.item_variations.map(iv => {
                          return (
                            <option
                            onChange={this.handleChange}
                            key={iv.id} 
                            value={iv.id}
                            >
                              {iv.value}
                            </option>
                          );
                        })}

                      </select>
                      </div>
                      </div>
                      {/* </div> */}
                    </Fragment>
                  );
                })}
              </form>
              </div>
            </div>
            <a href="#" class="btn  btn-primary"> Buy now </a>
            <a onClick={() => this.handleAddToCart(item.slug)} class="btn  btn-outline-primary"> <span class="text">Add to cart</span> <i class="fas fa-shopping-cart"></i>  </a>
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