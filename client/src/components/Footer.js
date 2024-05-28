// src/Footer.js
import React from 'react';
import '../styles/Footer.css';  // Assuming you want to style it with a separate CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <div className="footer-links">
                    <p>&copy; {new Date().getFullYear()} Alle rechten voorbehouden.</p>
                    <a href="https://skoolworkshop.nl/wp-content/uploads/2021/01/Skool-Workshop-Algemene-voorwaarden-2016.pdf">Algemene voorwaarden</a>
                    <a href="https://skoolworkshop.nl/privacybeleid">Privacystatement</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
