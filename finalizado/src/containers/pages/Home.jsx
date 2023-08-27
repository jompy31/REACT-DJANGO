// Home.jsx
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import BlogList from "../../components/home/BlogList";
import CTA from "../../components/home/CTA";
import Features from "../../components/home/Features";
import Header from "../../components/home/Header";
import Home_text from "../../components/home/Home_text";
import Product from "../../components/home/product";
import Products from "../../components/home/products";
import Whytdm from "../../components/home/why_tdm";
import LogoCloud from "../../components/home/LogoCloud";
import UseCases from "../../components/home/UseCases";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Scroll from "../../components/SmoothScrollbar";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>TDM - Topography, Deformation, Measurement</title>
        <meta
          name="description"
          content="TDM is the expert in Topography, Deformation, Measurement. Assessing, simulating, and predicting the behavior of complex devices under thermal stress. Improve your measurement accuracy and reliability with TDM's advanced warpage measurement system."
        />
      </Helmet>
      <Navbar />
      <div data-scroll-section className="pt-28">
        <Header />
        <LogoCloud />
        <Home_text />
        <Product />
        <UseCases />
        <CTA />
        <Whytdm />
        <Products />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
