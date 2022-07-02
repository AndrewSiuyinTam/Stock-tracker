import React from "react";
import { Component } from 'react';

const Navbar = () => {

    return(
        <div>
            <div className="bg-slate-200">
            <ul className="flex ">
  <li className="mr-6">
    <a className="text-blue-500 hover:text-blue-500 text-2xl" href="#">Andrew Tam</a>
  </li>
  <li className="mr-6">
    <a className="text-blue-500 hover:text-blue-800 text-2xl" href="#">Chart</a>
  </li>
  <li className="mr-6">
    <a className="text-blue-500 hover:text-blue-800 text-2xl" href="#">Data</a>
  </li>
  
 
</ul>
<h1 className='text-cyan-500 text-5xl text-center'>Stock Tracker</h1>
</div>


        </div>
    ) 
    
  };



  export default Navbar;
