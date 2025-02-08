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
    <>
    {/* <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg font-sans font-semibold bg-white text-sm 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
      transition-all duration-300 ease-in-out
      ${type === "success" ? "text-green-600" : "text-red-600"}
      `}
    >
      
    </div> */}
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-lg shadow-lg font-sans font-semibold bg-white text-sm">
  <div className={`p-4 border-l-4 ${type === "success" ? "border-green-500 bg-green-100" : "border-red-600 bg-red-100"} rounded-r-xl  inline-flex items-center w-auto max-w-max`}>
    {type === "success" ?  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
    </div> :  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
    </div> }
   
    <div className={`ml-1 whitespace-nowrap text-sm ${type === "success" ? "text-green-600" : "text-red-600"}`}>
      <p>{message}</p>
    </div>
  </div>
</div>

        </>
  );
};

export default Toast;
