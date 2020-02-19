import React from 'react'
import { addressListURL, addressCreateURL, countryListURL, userIDURL } from '../constants'
import { authAxios } from '../utils'


class Profile extends React.Component {
	
	state = { 
		activeItem: 'billingAddress',
		error: false,
		loading: false,
		addresses: [],
		countries: [],
		formData: {default: false},
		saving: false,
		success: false,
		userID: null
	}

		componentDidMount() {
			this.handleFetchAddresses()
			this.handleFetchCountries()
			this.handleFetchUserID()
		}

		handleItemClick = name => {
			this.setState({ activeItem: name }, () => {
			  this.handleFetchAddresses();
			});
		  };

		handleFormatCountries = countries => {
			const keys = Object.keys(countries)
			return keys.map(k => {
				return {
					id: k, 
					name: countries[k],
				}
			})
		}
		
		handleFetchCountries = () => {
				authAxios.get(countryListURL)
				.then(res => {
					this.setState({ 
						countries: this.handleFormatCountries(res.data)})
				})
				.catch(err => {
					this.setState({
						error: err
					})
				})
			}

		handleFetchUserID = () => {
				authAxios.get(userIDURL)
				.then(res => {
					console.log(res)
					this.setState({ 
						userID: res.data.userID })
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
					addresses: res.data, loading: false})
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

		handleSelectChange= (e) => {
			const {formData} = this.state;
			const updateFormData = {
				...formData,
			[e.target.name] : e.target.value
			}
			this.setState({
				formData: updateFormData
			})
		}
		handleToggleDefault = (e) => {
			const {formData} = this.state;
			const updateFormData = {
				...formData,
				default: formData.default
			}
			this.setState({
				formData: updateFormData
			})
		}

		handleCreateAddress = e => {
			this.setState({ saving: true })
			e.preventDefault()
			const { activeItem, formData, userID } = this.state
			authAxios.post(addressCreateURL, {
				...formData,
				user: userID,
				address_type: activeItem === 'billingAddress' ? 'B' : 'S'
			})
			.then(res => {
				console.log(res)
				this.setState({ saving: false, success: true })
			})
			.catch(err => {
				this.setState({ error: err })
			})
		}


		render() {
			const { error, loading, addresses, countries, activeItem, saving, success } = this.state
			let countriesList = countries.length > 0
			&& countries.map((item, i) => {
			return (
				<option key={i} value={item.id}>{item.name}</option>
			)
			}, this);
        return (
            		<section class="section-content padding-y">
						<div class="container">
						<div class="row">
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


							<aside class="col-md-3 mb-3">
								<ul class="list-group">
									<a 
									class={activeItem == 'billingAddress' ? 'list-group-item active' : 'list-group-item'} 
									onClick={() => this.handleItemClick('billingAddress')}> Billing Address  </a>
									<a 
									class={activeItem == 'shippingAddress' ? 'list-group-item active' : 'list-group-item'} 
									onClick={() => this.handleItemClick('shippingAddress')}> Shipping Address </a>
								</ul>
							</aside>
							<main class="col-md-9">
								{
									activeItem === 'billingAddress' ? <h1>Billing Address Form</h1> : <h1>Shipping Address Form</h1>
								}
							<form onSubmit={this.handleCreateAddress} success={success}>
						<div class="form-row mt-3">
						</div>
						<div class="form-group">
							<label for="inputAddress">Address</label>
							<input type="text" class="form-control" name='street_address' onChange={this.handleChange} placeholder="1234 Main St"></input>
						</div>
						<div class="form-group">
							<label for="inputAddress2">Address 2</label>
							<input type="text" class="form-control" name='apartment_address' onChange={this.handleChange} placeholder="Apartment, studio, or floor"></input>
						</div>
						<div class="form-row">
							<div class="form-group col-md-6">
							<label for="inputCity">City</label>
							<input type="text" class="form-control" name='city' onChange={this.handleChange}></input>
							</div>
							<div class="form-group col-md-4">
							<label for="inputState">State</label>
							<input type="text" class="form-control" name='state' onChange={this.handleChange}></input>
							</div>
							<div class="form-group col-md-4">
							<label for="inputState">Country</label>
							<select class="form-control bfh-countries" name='country' onChange={this.handleChange}>
								{countriesList}
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="inputZip">Zip</label>
							<input type="text" class="form-control" name='zip' onChange={this.handleChange}></input>
							</div>
							<div class="form-check">
							<input type="checkbox" class="form-check-input" name='default' onChange={this.handleSelectChange}></input>
							<label class="form-check-label" for="exampleCheck1">Make default address?</label>
							</div>
						</div>
						<button disable={saving} loading={saving} type="submit" class="btn btn-primary mt-3">Submit</button>
						</form>
						{addresses.map(i => {
							return (
								<article class="card mb-3">
			<div class="card-body">
				
				<figure class="icontext">
						<div class="icon">
							<img class="rounded-circle img-sm border" src="images/avatars/avatar3.jpg"></img>
						</div>
						<div class="text">
							<strong> {i.user} </strong> <br></br>
							myloginname@gmail.com <br></br>
							<a href="#">Edit</a>
						</div>
				</figure>
				<hr></hr>
				<p>
					<i class="fa fa-map-marker text-muted"></i> &nbsp; My address:  
					 <br></br>
					{i.city}, {i.street_address}, {i.country}, {i.state} {i.zip}
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
							)
						})}
					


	</main>
</div>

</div>
</section>
        )
    }
}

export default Profile