import React from "react";
import Navbar from "./Navbar";
import Sidemenu from "./Sidemenu";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidemenu />

      {children}
    </>
  );
};

export default Layout;
