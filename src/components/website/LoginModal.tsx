const LoginModal = ({ setLoginModalOpen }) => {
  //   const confirmModalAndProceed = () => {
  //     setShowModal(false);
  //   };
  return (
    <div className="absolute top-1/2 left-1/2">
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Login or Sign Up</h2>
            <button
              onClick={() => setLoginModalOpen(false)}
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
              //   onClick={confirmModalAndProceed}
              disabled={true}
              className="px-6 py-2 rounded-full w-full text-white bg-yellow-300 cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
