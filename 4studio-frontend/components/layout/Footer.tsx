'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} 4Studio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
