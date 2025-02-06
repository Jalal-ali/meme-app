import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error"; // Defines allowed toast types
  duration?: number; // Duration in milliseconds
  onClose?: () => void; // Callback when toast closes
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg font-sans font-normal bg-white text-sm 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
      transition-all duration-300 ease-in-out
      ${type === "success" ? "text-green-600" : "text-red-600"}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
