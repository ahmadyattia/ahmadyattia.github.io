// this component is design with a mobile-first approach

import React from "react";
import styles from "@/styles/layout/Footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.grid}>
          <ul>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Warranty Info</li>
          </ul>
          <ul>
            <li>Support</li>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Shipping Info</li>
          </ul>
          <ul>
            <li>Resources</li>
            <li>Our Blog</li>
            <li>Pricing</li>
            <li>Newsletter</li>
          </ul>
          <ul>
            <li>About</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Events</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
