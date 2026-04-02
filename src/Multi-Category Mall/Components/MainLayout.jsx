import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const MainLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <Navbar />
      <Breadcrumbs />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
