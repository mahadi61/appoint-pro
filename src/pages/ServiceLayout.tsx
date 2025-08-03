import Footer from "@/components/website/Footer";
import { Navbar } from "@/components/website/Navbar";
import CheckoutService from "./websitePages/CheckoutService";

const ServiceLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <CheckoutService />
      <div className="hidden md:block">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ServiceLayout;
