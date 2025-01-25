import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/20 text-white border-t-4 border-red-500 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Company Name</h2>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">Phone: +123456789</p>
          <p className="text-sm">Email: info@example.com</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm hover:underline">Home</a>
          <a href="#" className="text-sm hover:underline">About Us</a>
          <a href="#" className="text-sm hover:underline">Services</a>
          <a href="#" className="text-sm hover:underline">Contact</a>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">
        &copy; {new Date().getFullYear()} Company Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
