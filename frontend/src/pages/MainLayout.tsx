import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/layout/Footer";

const MainLayout = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <Navbar />
      <Breadcrumbs />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
