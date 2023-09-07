import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import mailImg from "./../../images/mail.svg";
import IGImg from "./../../images/instagram.svg";
import FBImg from "./../../images/facebook.svg";
import tiktokImg from "./../../images/tiktok.svg";
import linkedinImg from "./../../images/linkedin.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div>
          <h3>Contact</h3>
          <div className="contactFooter">
            <img width="20px" src={mailImg} alt="logo mail" />
            <p>ecoupper@ecoupper.com</p>
          </div>
          <div className="contactFooter">
            <img width="20px" src={mailImg} alt="logo mail" />
            <p>Pamplona Street, 47, Barcelona, 08088</p>
          </div>
        </div>
        <div>
          <h3>Legal</h3>
          <p>Terms & Conditions</p>
          <p>Privacy</p>
          <p>Coockie Policy</p>
        </div>
        <div className="socialFooter">
          <h3 >Social</h3>
          <div className="socialLogos">
            <img src={IGImg} alt="Instagram" />
            <img src={tiktokImg} alt="TikTok" />
            <img src={linkedinImg} alt="LinkdIn" />
            <img src={FBImg} alt="Facebook " />
          </div>
        </div>
      </div>
      <Link to="/About"><h3>About us</h3></Link>
      <p>2023 EcoUpper. All rights reserved</p>
    </footer>
  );
};

export default Footer;
