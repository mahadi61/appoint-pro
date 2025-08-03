/* eslint-disable @typescript-eslint/no-explicit-any */
import StepFour from "@/components/website/Steps/StepFour";
import StepOne from "@/components/website/Steps/StepOne";
import StepThree from "@/components/website/Steps/StepThree";
import StepTwo from "@/components/website/Steps/StepTwo";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calculation from "./Calculation";

// Define types
interface Service {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
}

interface CartItem extends Service {
  count: number;
}

interface SelectedDateTime {
  professional: string | null;
  date: string | null;
  time: string | null;
}

const CheckoutService = () => {
  const [step, setStep] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});
  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime>({
    professional: null,
    date: null,
    time: null,
  });
  const navigate = useNavigate();
  const handleAddItemsClick = (service: Service) => {
    setCartItems((prev) => {
      const existing = prev[service.id];
      const count = existing ? existing.count + 1 : 1;
      return {
        ...prev,
        [service.id]: { ...service, count },
      };
    });
  };

  const handleRemoveItemClick = (serviceId: string) => {
    setCartItems((prev) => {
      const existing = prev[serviceId];
      if (!existing) return prev;
      const count = existing.count - 1;
      if (count <= 0) {
        const { [serviceId]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [serviceId]: { ...existing, count },
      };
    });
  };

  const hasItems = Object.keys(cartItems).length > 0;

  const nextStep = () => {
    if (step === 3) setShowModal(true);
    else setStep((prev) => Math.min(prev + 1, 4));
  };

  const confirmModalAndProceed = () => {
    setShowModal(false);
    setStep(4);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (step == 1) {
      navigate("/");
    }
  };

  const handleSelectionChange = (selection: SelectedDateTime) => {
    setSelectedDateTime(selection);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            handleAddItemsClick={handleAddItemsClick}
            handleRemoveItemClick={handleRemoveItemClick}
            cartItems={cartItems}
          />
        );
      case 2:
        return (
          <StepTwo
            handleAddItemsClick={handleAddItemsClick}
            handleRemoveItemClick={handleRemoveItemClick}
            cartItems={cartItems}
            onSelectionChange={handleSelectionChange}
          />
        );
      case 3:
        return <StepThree onSelectionChange={handleSelectionChange} />;
      case 4:
        return <StepFour />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAFAFA]">
      <section className="w-full max-w-[1100px] mx-auto py-16 gap-10 flex flex-col md:flex-row">
        {/* Left section */}
        <div className="w-full md:basis-[60%] md:max-w-[60%] min-w-0 px- md:px-0">
          <button
            onClick={prevStep}
            className="flex items-center gap-2 mb-4 pt-4 px-4 md:px-0"
          >
            <ArrowLeft className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Step {step} of 4</h2>
          </button>

          <h2 className="font-bold text-2xl my-3 px-4 md:px-0">
            {step === 1
              ? "Furniture Cleaning"
              : step === 2
              ? "Popular Add-ons"
              : "Date & Time"}
          </h2>

          <div className="bg-white rounded shadow md:p-6 relative min-h-[400px]">
            {renderStep()}
            {step < 4 && (
              <div className="absolute bottom-0 left-0 w-full px-6">
                <div className="bg-white rounded-lg py-6 hidden md:block">
                  <button
                    onClick={nextStep}
                    disabled={!hasItems}
                    className={`bg-yellow-400 py-3 rounded-full text-white font-bold w-full ${
                      !hasItems
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-yellow-500"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="hidden md:block md:basis-[40%] md:max-w-[40%] min-w-0 py-28">
          <Calculation
            cartItems={cartItems}
            selectedDateTime={selectedDateTime}
            nextStep={nextStep}
            hasItems={hasItems}
          />
        </div>
      </section>

      {/* Mobile Bottom Drawer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-40">
        <div className="px-4 py-4">
          <Calculation
            cartItems={cartItems}
            selectedDateTime={selectedDateTime}
            nextStep={nextStep}
            hasItems={hasItems}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Login or Sign Up</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <hr className="border-gray-300 mb-10" />

            <p className="text-gray-400">Your Phone Number</p>
            <input
              type="number"
              className="rounded w-full p-2 mb-4 border border-gray-300 focus:outline-none"
              placeholder="50 123 45 67"
            />

            <hr className="border-gray-300 mb-3" />

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmModalAndProceed}
                disabled={true}
                className="px-6 py-2 rounded-full w-full text-white bg-yellow-300 cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutService;
