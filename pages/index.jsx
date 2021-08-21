import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import Navbar from "../components/Navbar";
import theme from "../themeConfig";
import Footer from "../components/Footer";
import Posts from "../components/Posts";

const Sliderprops = {
  slideMargin: 10,
  maxVisiblesSlides: 5,
  PageTransition: 500,
};
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Posts />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
