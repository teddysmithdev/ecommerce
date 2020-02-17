import React from 'react'
import { addressListURL, addressCreateURL, countryListURL } from '../constants'
import { authAxios } from '../utils'


class Profile extends React.Component {
	
	state = { 
		activeItem: 'billingAddress',
		error: false,
		loading: false
	}

		componentDidMount() {
			this.handleFetchAddresses()
			this.handleFetchCountries()
		}
		
		handleFetchCountries = () => {
				authAxios.get(countryListURL)
				.then(res => {
					this.setState({ 
						address: res.data, loading: false})
				})
				.catch(err => {
					this.setState({
						error: err
					})
				})
			}


		handleFetchAddresses = () => {
			this.setState({ loading: true })
			authAxios.get(addressListURL)
			.then(res => {
				this.setState({ 
					address: res.data, loading: false})
			})
			.catch(err => {
				this.setState({
					error: err
				})
			})
		}

		handleChange = e => {
			const {formData} = this.state;
			const updateFormData = {
				...formData,
				[e.target.name]: e.target.value
			}
			this.setState({
				formData: updateFormData
			})
		}

		handleCreateAddress = e => {
			e.preventDefault()
			const { formData } = this.state
			console.log(formData)
		}


		render() {
        return (
            		<section class="section-content padding-y">
						<div class="container">
						<div class="row">
							<aside class="col-md-3">
								<ul class="list-group">
									<a class="list-group-item active" href="#"> Billing Address  </a>
									<a class="list-group-item" href="#"> Shipping Address </a>
								</ul>
							</aside>
							<main class="col-md-9">
							<form>
						<div class="form-row mt-3">
						</div>
						<div class="form-group">
							<label for="inputAddress">Address</label>
							<input type="text" class="form-control" onChange={this.handleChange} placeholder="1234 Main St"></input>
						</div>
						<div class="form-group">
							<label for="inputAddress2">Address 2</label>
							<input type="text" class="form-control" onChange={this.handleChange} placeholder="Apartment, studio, or floor"></input>
						</div>
						<div class="form-row">
							<div class="form-group col-md-6">
							<label for="inputCity">City</label>
							<input type="text" class="form-control" onChange={this.handleChange}></input>
							</div>
							<div class="form-group col-md-4">
							<label for="inputState">State</label>
							<select id="inputState" class="form-control">
								<option selected>Choose...</option>
								<option>...</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="inputZip">Zip</label>
							<input type="text" class="form-control" onChange={this.handleChange}></input>
							</div>
						</div>
						<button type="submit" class="btn btn-primary">Sign in</button>
						</form>
						<article class="card mb-3">
						<div class="card-body">
				
				<figure class="icontext">
						<div class="icon">
							<img class="rounded-circle img-sm border" src="images/avatars/avatar3.jpg"></img>
						</div>
						<div class="text">
							<strong> Mr. Jackson Someone </strong>
							<a href="#">Edit</a>
						</div>
				</figure>
				<hr></hr>
				<p>
					<i class="fa fa-map-marker text-muted"></i>My address:
					Tashkent city, Street name, Building 123, House 321 &nbsp 
					<a href="#" class="btn-link"> Edit</a>
				</p>
				<article class="card-group">
					<figure class="card bg">
						<div class="p-3">
							 <h5 class="card-title">38</h5>
							<span>Orders</span>
						</div>
					</figure>
					<figure class="card bg">
						<div class="p-3">
							 <h5 class="card-title">5</h5>
							<span>Wishlists</span>
						</div>
					</figure>
					<figure class="card bg">
						<div class="p-3">
							 <h5 class="card-title">12</h5>
							<span>Awaiting delivery</span>
						</div>
					</figure>
					<figure class="card bg">
						<div class="p-3">
							 <h5 class="card-title">50</h5>
							<span>Delivered items</span>
						</div>
					</figure>
				</article>
				

			</div>
		</article>

		<article class="card  mb-3">
			<div class="card-body">
				<h5 class="card-title mb-4">Recent orders </h5>	

				<div class="row">
				<div class="col-md-6">
					<figure class="itemside  mb-3">
						<div class="aside"><img src="images/items/1.jpg" class="border img-sm"></img></div>
						<figcaption class="info">
							<time class="text-muted"><i class="fa fa-calendar-alt"></i> 12.09.2019</time>
							<p>Great item name goes here </p>
							<span class="text-warning">Pending</span>
						</figcaption>
					</figure>
				</div>
				<div class="col-md-6">
					<figure class="itemside  mb-3">
						<div class="aside"><img src="images/items/2.jpg" class="border img-sm"></img></div>
						<figcaption class="info">
							<time class="text-muted"><i class="fa fa-calendar-alt"></i> 12.09.2019</time>
							<p>Machine for kitchen to blend </p>
							<span class="text-success">Departured</span>
						</figcaption>
					</figure>
				</div>
				<div class="col-md-6">
					<figure class="itemside mb-3">
						<div class="aside"><img src="images/items/3.jpg" class="border img-sm"></img></div>
						<figcaption class="info">
							<time class="text-muted"><i class="fa fa-calendar-alt"></i> 12.09.2019</time>
							<p>Ladies bag original leather </p>
							<span class="text-success">Shipped  </span>
						</figcaption>
					</figure>
				</div>
			</div>

			<a href="#" class="btn btn-outline-primary"> See all orders  </a>
			</div>
		</article>

	</main>
</div>

</div>
</section>
        )
    }
}

export default Profile