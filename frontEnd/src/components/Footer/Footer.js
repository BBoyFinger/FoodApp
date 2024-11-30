import React from "react";
import "./footer.css";

function Footer() {
  return (
    <section id="footer">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-about">
            <h2>About us</h2>
            <ul>
              <li>
                <a>Introduce</a>
              </li>
              <li>
                <a>News</a>
              </li>
              <li>
                <a>Career opportunities</a>
              </li>
              <li>
                <a>Shop</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-sp">
            <h2>Always ready to assist</h2>
            <ul>
              <li>
                <a>Support 028.71.087.088 (07:00-21:00)</a>
              </li>
              <li>
                <a>Transport 1800 6936 (07:00-21:00)</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-delivery">
            <h2>Transport</h2>
            <ul>
              <li>
                <a>Shipping method</a>
              </li>
              <li>
                <a>payment</a>
              </li>
              <li>
                <a>Discount</a>
              </li>
            </ul>
          </div>
          <div className="footer-top-delivery-image">
              <img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664"></img>
          </div>
        </div>
        <div className="footer-bot">
          <p>Copyright © 2020 Tmart. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
