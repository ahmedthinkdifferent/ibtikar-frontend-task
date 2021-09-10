import {toast} from "react-toastify";
import {TypeOptions} from "react-toastify/dist/types";

export default class ToastManager {

    public  static showSuccess(message: string) {
        ToastManager.show(message, "success");
    }

    public static showWarning(message: string) {
        ToastManager.show(message, "warning");
    }

    public static showError(message: string) {
        ToastManager.show(message, "error");
    }

    public static showInfo(message: string) {
        ToastManager.show(message, "info");
    }

    public static showDark(message: string) {
        ToastManager.show(message, "dark");
    }

    private static show(message: string, type: TypeOptions) {
        toast(message, {type: type, position: "top-left", pauseOnHover: true});
    }
}