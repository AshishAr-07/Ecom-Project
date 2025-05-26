import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout=({
  children,
  title,
  description,
  keywords,
  author,
}) =>{
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
      {/* //{toaster} */}
      <Toaster/>
        {children}
      </main>
      <Footer/>
    </>
  );
}

Layout.defaultProps = {
  title:"E-commerce App",
  description:"Mern Stack Project",
  keywords:"mern,react,node,mangodb",
  author:"Ashish"
};

export default Layout;