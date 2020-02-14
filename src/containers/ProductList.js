import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'; 
import { productListURL, addToCartURL } from '../constants'
import { authAxios } from '../utils'
import { fetchCart } from "../store/actions/cart";
import { connect } from "react-redux";


class ProductList extends React.Component {
    
    state = {
        loading: false,
        error: null,
        data: []
      };

    componentDidMount() {
    axios
      .get(productListURL)
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
            console.log(res.data)
            this.setState({ loading: false });
          })
          .catch(err => {
            this.setState({ error: err, loading: false });
          });
      };

    render() {
        const { data, error, loading } = this.state;
        return (
            <div>
            <section class="section-content">
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
            <header class="section-heading">
                <h3 class="section-title">Popular products</h3>
                    </header>
                    <div class="row">
                        {data.map(item => {
                            return (
                          <div class="col-md-3">
                            <div href="#" class="card card-product-grid">
                            <a href="#" class="img-wrap" onClick={() => this.props.history.push(`/products/${item.id}`)}> 
                            <img src="images/items/1.jpg"></img> 
                            </a>
                            <figcaption class="info-wrap">
                            <small class="text-uppercase font-weight-bolder text-warning">{item.category}</small>
                            <a href="#" key={item.id} class="title">{item.title}</a>
                            <small class="text-muted">{item.description}</small>
                            <div class="price mt-1">{item.price}</div>
                            <a href="#" onClick={() => this.handleAddToCart(item.slug)} class="btn btn-sm btn-outline-primary float-right">Add to cart <i class="fa fa-shopping-cart"></i></a>
                            </figcaption>
                        </div>
                    </div>  
                            )
                        })}
                        
                            </div>
                        </div>
                </section>
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
  )(ProductList)
);