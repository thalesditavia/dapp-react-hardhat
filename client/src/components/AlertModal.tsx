interface AlertModalI {
  modalType: string;
  children: React.ReactNode;
}

function AlertModal({ modalType, children }: AlertModalI) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`p-10 rounded-lg flex gap-6 justify-center items-center flex-col ${
          modalType === "alert" ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default AlertModal;
