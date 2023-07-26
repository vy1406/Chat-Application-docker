import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showAlert =
  (message, type = "success") =>
  (dispatch) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      case "error":
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      case "warning":
        toast.warn(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      default:
        toast.info(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
    }
  };
