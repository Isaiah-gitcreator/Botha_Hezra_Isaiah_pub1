import React from "react";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

const DashboardFooter = ({ onNav }) => {
  return (
    <footer className="dk-footer">
      <div className="dk-left">
        <p>© 2025 Isaiah Botha. All rights reserved.</p>
        <p>
          <FaEnvelope /> hezraisaiahbotha@gmail.com &nbsp;
          <FaPhone /> +260 975 430 928
        </p>
        <div className="dk-nav">
          <a href="#about" onClick={(e) => { e.preventDefault(); onNav('about'); }}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onNav('contact'); }}>Contact</a>
        </div>
      </div>
      
    </footer>
  );
};

export default DashboardFooter;




