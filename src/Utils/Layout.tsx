import React, { ReactNode } from "react";
import Footer from "../Components/Global/Footer/Footer";
import Navbar from "../Components/Global/Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
