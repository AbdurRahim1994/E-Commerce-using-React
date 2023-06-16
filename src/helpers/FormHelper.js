import cogoToast from "cogo-toast";

class FormHelper {
    SuccessToast(msg) {
        cogoToast.success(msg, { position: "top-center" })
    }

    ErrorToast(msg) {
        cogoToast.error(msg, { position: "top-center" })
    }

    IsEmpty(value) {
        if (!value) {
            return true
        }
        else {
            return false
        }
    }

    GetBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })
}

export const { SuccessToast, ErrorToast, IsEmpty, GetBase64 } = new FormHelper()