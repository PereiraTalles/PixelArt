import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-black text-center py-3">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <a href="https://wa.me/SEUNUMERO" className="text-light" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} />
            </a>
          </div>
          <div className="col-4">
            <span className="text-light">© 2025 PixelArt</span>
          </div>
          <div className="col-4">
            <a href="https://instagram.com/SEUINSTAGRAM" className="text-light" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
