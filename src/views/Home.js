import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Testimonial from '../components/sections/Testimonial';
var CryptoJS = require("crypto-js");


const Home = () => {

  return (
    <>

      <Hero className="illustration-section-01" />
      <FeaturesTiles />

      <Testimonial topDivider />

    </>
  );
}

export default Home;