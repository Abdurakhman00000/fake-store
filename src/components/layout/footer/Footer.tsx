import React from 'react'
import scss from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={scss.Footer}>
        <div className="container">
            <div className={scss.content}>
                <div className={scss.block}>
                  <h2>Exclusive</h2>
                  <h1>Subscribe</h1>
                  <div className={scss.nav}>
                  <p>Get 10% off your first order</p>
                  <input type="text" placeholder='Enter your email'/>
                  </div>
                </div>

                <div className={scss.block}>
                  <h1>Support</h1>
                  <div className={scss.nav}>
                  <p>Kyrgyzstan, Bishkek <br /> DH1515, Pudovkin</p>
                  <p>abdurakhman@gmail.com</p>
                  <p>+996 559 70-85-15</p>
                  </div>
                </div>

                <div className={scss.block}>
                  <h1>Account</h1>
                  <div className={scss.nav}>
                  <p>My Account</p>
                  <p>Login / Register</p>
                  <p>Cart</p>
                  <p>Wishlist</p>
                  <p>Shop</p>
                  </div>
                </div>

                <div className={scss.block}>
                  <h1>Quick Link</h1>
                  <div className={scss.nav}>
                  <p>Privacy Policy</p>
                  <p>Terms Of Use</p>
                  <p>FAQ</p>
                  <p>Contact</p>
                  </div>
                </div>

                <div className={scss.block_with_img}>
                  <h1>Download App</h1>
                  <div className={scss.nav}>
                    <p>Save $3 with App New User Only</p>

                    <div className={scss.nav_img}>
                      <div className={scss.img1}></div>

                      <div className={scss.img_block}>
                        <div className={scss.img2}></div>
                        <div className={scss.img3}></div>
                      </div>
                    </div>

                    <div className={scss.icons_img}></div>
                  </div>

                </div>

            </div>
        </div> 


        <div className={scss.under_footer}>
          <p>@ Powered by A Dev. 2024</p>
        </div>
    </footer>
  )
}

export default Footer