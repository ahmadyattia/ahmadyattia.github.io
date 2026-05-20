import React from "react";
import Hero from "@/components/Homepage/Hero/Hero";
import HomepageCategories from "@/components/Homepage/categories/HomepageCategories";

const Home = () => {
  return (
    <div>
      <HomepageCategories />
      <Hero />
    </div>
  );
};

export default Home;
