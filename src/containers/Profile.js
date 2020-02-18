import React from 'react'
import { addressListURL, addressCreateURL, countryListURL } from '../constants'
import { authAxios } from '../utils'


class Profile extends React.Component {
	
	state = { 
		activeItem: 'billingAddress',
		error: false,
		loading: false,
		addresses: [],
		countries: [],
		formData: {default: false},
	}

		componentDidMount() {
			this.handleFetchAddresses()
			this.handleFetchCountries()
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
					name: countries[k]
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
			const { activeItem, formData } = this.state
			authAxios.post(addressCreateURL, {
				...formData,
				address_type: activeItem === 'billingAddress' ? 'B' : 'S'
			})
			.then(res => {
				this.setState({ saving: false, success: true })
			})
			.catch(err => {
				this.setState({ error: err })
			})
		}


		render() {
			const { error, loading, addresses, countries, activeItem, formData } = this.state
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
							<form onSubmit={this.handleCreateAddress}>
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
							<input type="text" class="form-control" name='zip code' onChange={this.handleChange}></input>
							</div>
							<div class="form-check">
							<input type="checkbox" class="form-check-input" name='default' onChange={this.handleSelectChange}></input>
							<label class="form-check-label" for="exampleCheck1">Make default address?</label>
							</div>
						</div>
						<button type="submit" class="btn btn-primary mt-3">Submit</button>
						</form>
						{ addresses.map(i => {
							return <p>{i.addresses}</p>
						})}
					

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