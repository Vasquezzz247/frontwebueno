import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#B5D4E9',
    color: 'black',
    padding: '1rem',
    marginTop: 'auto',
  };

  return (
    <footer style={footerStyle}>
      <div className="flex justify-end gap-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
        >
          <FaFacebook size={20} className="text-black" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
        >
          <FaTwitter size={20} className="text-black" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
        >
          <FaInstagram size={20} className="text-black" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
        >
          <FaLinkedin size={20} className="text-black" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75"
        >
          <FaYoutube size={20} className="text-black" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
