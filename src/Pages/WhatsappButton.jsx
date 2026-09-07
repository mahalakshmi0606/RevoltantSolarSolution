// components/WhatsAppButton.jsx
import React from 'react';
import './WhatsappButton.css';

const WHATSAPP_NUMBER = '919384167482';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20am%20interested%20in%20your%20solar%20solutions.`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      💬
    </a>
  );
};

export default WhatsAppButton;