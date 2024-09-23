import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className=" bg-gray-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">User Management System</h1>
      
      </div>
    </nav>
  );
}

export default Navbar;
