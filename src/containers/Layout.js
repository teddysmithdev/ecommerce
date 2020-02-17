import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from '../store/actions/cart'

class CustomLayout extends React.Component {

  componentDidMount(){
    this.props.fetchCart()
  }
  render() {
    const { authenticated, cart } = this.props;
    const menuItems = [
      { name: 'All', label: 'products' },
      { name: 'Sportswear', label: 'S' },
      { name: 'Outerwear', label: 'OW' },
    ]
    return (
      <div>
        <header class="section-header">
        <section class="header-main border-bottom">
	<div class="container">
<div class="row align-items-center">
	<div class="col-lg-2 col-6">
		<Link to='/' href="http://bootstrap-ecommerce.com" class="brand-wrap">
			<img class="logo" src="images/logo.png"></img>
		</Link>
	</div>
	<div class="col-lg-6 col-12 col-sm-12">
		<form action="#" class="search">
			<div class="input-group w-100">
			    <input type="text" class="form-control" placeholder="Search"></input>
			    <div class="input-group-append">
			      <button class="btn btn-primary" type="submit">
			        <i class="fa fa-search"></i>
			      </button>
			    </div>
		    </div>
		</form>
	</div> 
	<div class="col-lg-4 col-sm-6 col-12">
		<div class="widgets-wrap float-md-right">
			<div class="widget-header  mr-3">
        <Link to='/ordersummary'>
				<a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-shopping-cart"></i></a>
				<span class="badge badge-pill badge-danger notify">{cart !== null ? cart.order_items.length : 0}</span>
        </Link>
			</div>
			<div class="widget-header icontext">
        <Link to='/profile'>
				<a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></a>
        </Link>
				<div class="text">
					<span class="text-muted">Welcome!</span>
					<div> 
            {authenticated ? (
              <a onClick={() => this.props.logout()}>Logout</a>
            ) : (
              <Fragment>
              <Link to='/login'>Login </Link> | 
              <Link to='/signup'> Signup</Link>
              </Fragment>
            )}
					</div>
				</div>
			</div>
		</div> 
	    </div> 
    </div>
	    </div> 
      </section>
        </header>
        <nav class="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
  <div class="container">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="main_nav">
      <ul class="navbar-nav">
      	<li class="nav-item dropdown">
          <a class="nav-link pl-0" data-toggle="dropdown" href="#"><strong> <i class="fa fa-bars"></i> &nbsp  All category</strong></a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Foods and Drink</a>
            <a class="dropdown-item" href="#">Home interior</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Category 1</a>
            <a class="dropdown-item" href="#">Category 2</a>
            <a class="dropdown-item" href="#">Category 3</a>
          </div>
        </li>
        {menuItems.map(item => {
          return (
          <li class="nav-item">
          <Link 
          to={`/category/${item.label}`}
          >{item.name}</Link>
        </li>
          )
        })}
      </ul>
    </div> 
  </div> 
</nav>
        {this.props.children}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()) 
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
