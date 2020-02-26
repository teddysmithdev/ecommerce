import React from 'react'
import logo from '../assets/1.png'

const Banner = () => {
    return (
        <div>
            <section class="section-intro padding-y-sm">
                <div class="container">
                    <div class="intro-banner-wrap">
                    <img src={logo} class="img-fluid rounded"></img>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner
