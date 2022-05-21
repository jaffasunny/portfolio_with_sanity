import React from "react";
import { Navbar } from "./components";
import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import "./App.scss";
import Certifications from "./container/Certifications/Certifications";

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Certifications />
      <Footer />
    </div>
  );
};

export default App;
