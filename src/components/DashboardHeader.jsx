
import React from "react";
import { FaWhatsapp, FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";



const DashboardHeader = ({ onNav, onDeleteClick }) => {
//const <DashboardHeader onNav={handleNav} onDeleteClick={handleDelete} />  => {
  return (
    <header className="dk-header">
      <div className="dk-left">
        <div className="dk-brand">
          <div className="logo-dot" aria-hidden />
          <h1>Administration Panel With React-Redux</h1>
        </div>
        <nav className="dk-nav">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNav("home");
            }}
          >
            Home
          </a>
          <a
            href="#users"
            onClick={(e) => {
              e.preventDefault();
              onNav("users");
            }}
          >
            Users
          </a>
          <a
            href="#create"
            onClick={(e) => {
              e.preventDefault();
              onNav("create");
            }}
          >
            Create
          </a>


            {/*  <a
            href="#delete"
            onClick={(e) => {
              e.preventDefault();
              if (onDeleteClick) onDeleteClick();
            }}
          >
            Delete
          </a>
           */}

         
        </nav>
      </div>

      {/* ✅ Right section with social icons properly structured */}
      <div className="dk-right">
        <div className="dk-social">
          <a href="https://wa.me/+260975430928" title="WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          <a href="https://www.linkedin.com/in/hezra-isaiah-botha-56b514382" title="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://web.facebook.com/IsaiaHezraBotha" title="Facebook" target="_blank" rel="noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com/isaiahhezra" title="Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://github.com/Isaiah-gitcreator" title="GitHub" target="_blank" rel="noreferrer"><FaGithub /></a>


         

          

        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;