import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ToastContainer.arguments = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
};

export default ToastContainer;