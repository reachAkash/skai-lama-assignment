import React, { createContext, useContext, useState, useCallback } from "react";

// Create a context
const ToastContext = createContext();

// Toast Provider component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    isVisible: false,
    success: true,
  });

  // Show toast function
  const showToast = useCallback((message, success = true, duration = 3000) => {
    setToast({ message, isVisible: true, success });

    // Hide toast after duration
    setTimeout(() => {
      setToast({ message: "", isVisible: false, success: true });
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.isVisible && (
        <div
          className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
            toast.success ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => useContext(ToastContext);
